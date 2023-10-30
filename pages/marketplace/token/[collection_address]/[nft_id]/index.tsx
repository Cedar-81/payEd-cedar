import {
  Box,
  Button,
  Group,
  Paper,
  SimpleGrid,
  Skeleton,
  Text,
} from "@mantine/core";
import {
  ConnectWallet,
  NFT,
  ThirdwebNftMedia,
  ThirdwebSDK,
  useAddress,
  useContract,
  useValidDirectListings,
} from "@thirdweb-dev/react";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Layout from "../../../../../components/layout";
import { MARKETPLACE_ADDRESS } from "../../../../../const/addresses";

type Props = {
  nft: NFT;
};

function NftDetail({ nft }: Props) {
  const router = useRouter();
  const address = useAddress();
  const { collection_address, nft_id } = router.query;
  const { contract: marketplace, isLoading: loadingMarketplace } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );

  console.log("nft", nft, "collection_address", collection_address, nft_id);

  const { contract: nftCollection } = useContract(collection_address as string);

  const { data: directListing, isLoading: loadingDirectListing } =
    useValidDirectListings(marketplace, {
      tokenContract: collection_address as string,
      tokenId: nft_id as string,
    });

  console.log(
    directListing,
    "nft collection",
    nftCollection,
    "marketplace",
    marketplace
  );

  async function buyListing() {
    let txResult;

    if (!address) return;

    if (directListing?.[0]) {
      txResult = await marketplace?.directListings.buyFromListing(
        directListing[0].id,
        1
      );
    } else {
      throw new Error("No listing found");
    }

    return txResult;
  }

  function formatTimestamp(timestampInSeconds: number): string {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };

    const date = new Date(timestampInSeconds * 1000); // Convert seconds to milliseconds
    const formattedDate = date.toLocaleDateString("en-US", options);

    return `${formattedDate}`;
  }

  function truncateNFTContractAddress(
    address: string,
    startLength = 6,
    endLength = 4
  ) {
    if (address.length !== 42) {
      return "Invalid Address"; // Check if the address length is not 42 characters
    }

    const truncatedStart = address.slice(0, startLength);
    const truncatedEnd = address.slice(-endLength);

    return `${truncatedStart}...${truncatedEnd}`;
  }

  return (
    <Layout>
      {nft.metadata && (
        <Box className="p-10 pt-6">
          <Skeleton
            visible={loadingMarketplace && loadingDirectListing}
            className="h-[100vh] w-[100%]"
          >
            <Box className="pb-6">
              <Group>
                <Text className="text-3xl">
                  {nft.metadata && nft.metadata.name}
                </Text>
                <ConnectWallet className="border-purple-700 border-2 text-purple-700" />
              </Group>
              <Text>
                created by <span>{truncateNFTContractAddress(nft.owner)}</span>
              </Text>
            </Box>
            <SimpleGrid
              cols={{ base: 1, lg: 2 }}
              className=" max-w-[60rem] h-full"
            >
              <Box className="h-[35rem] rounded-md max-w-[28rem] relative overflow-hidden">
                <ThirdwebNftMedia
                  metadata={nft.metadata}
                  className="!object-cover !w-full !h-full"
                />
              </Box>
              <SimpleGrid cols={1}>
                <Paper
                  withBorder
                  className="border-2 rounded-md overflow-hidden"
                >
                  <Box className="p-3 bg-purple-300">Description</Box>
                  <Text className="p-3">{nft && nft.metadata.description}</Text>
                </Paper>
                <Paper
                  withBorder
                  className="border-2 flex h-max flex-col rounded-md overflow-hidden"
                >
                  <Box className="p-3 bg-purple-300">
                    Sales ends{" "}
                    {directListing &&
                      formatTimestamp(directListing[0].endTimeInSeconds)}
                  </Box>
                  <Box className="p-3 flex flex-col justify-between h-full">
                    <Box className="py-6">
                      <Text size="sm">Current price</Text>
                      <Group>
                        <Text className="text-3xl">{`${
                          directListing &&
                          directListing[0]?.currencyValuePerToken.displayValue
                        } ${
                          directListing &&
                          directListing[0]?.currencyValuePerToken.symbol
                        }`}</Text>
                        {/* <Text size="sm">N200,000</Text> */}
                      </Group>
                    </Box>
                    <Button
                      onClick={buyListing}
                      variant="default"
                      className="w-full bg-purple-900 text-white"
                    >
                      Buy
                    </Button>
                  </Box>
                </Paper>
              </SimpleGrid>
            </SimpleGrid>
          </Skeleton>
        </Box>
      )}
    </Layout>
  );
}

export default NftDetail;

export const getStaticProps: GetStaticProps = async (context) => {
  const tokenId = context.params?.nft_id as string;
  const tokenAddress = context.params?.collection_address as string;

  const sdk = new ThirdwebSDK("mumbai");

  const contract = await sdk.getContract(tokenAddress);

  const nft = await contract.erc721.get(tokenId);

  let contractMetadata;

  try {
    contractMetadata = await contract.metadata.get();
  } catch (e) {}

  return {
    props: {
      nft,
      contractMetadata: contractMetadata || null,
    },
    revalidate: 1, // https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true, // can also be true or 'blocking'
  };
};
