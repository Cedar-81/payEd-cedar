import {
  NFT,
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import React, { useState } from "react";
import { NFT_COLLECTION_ADDRESS } from "../../../const/addresses";
import {
  Box,
  Button,
  Grid,
  GridCol,
  Group,
  Modal,
  Paper,
  SimpleGrid,
  Skeleton,
  Text,
} from "@mantine/core";
import MarketplaceItemCard from "../../../components/MarketplaceItemCard";
import Link from "next/link";
import ProfileItemCard from "../../../components/ProfileItemCard";
import { useDisclosure } from "@mantine/hooks";
import ListingForm from "../../../components/ListingForm";
import Layout from "../../../components/layout";

function Sell() {
  const { contract } = useContract(NFT_COLLECTION_ADDRESS);
  const address = useAddress();
  const { data, isLoading } = useOwnedNFTs(contract, address);
  const [selectedNFT, setSelectedNFT] = useState<NFT>();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Layout>
      <Box className="p-10">
        <Box className="mb-8">
          <Text className="text-2xl">Sell NFTs</Text>
          <Text className="text">List your nfts for sale in marketplace</Text>
        </Box>
        <SimpleGrid cols={4}>
          {isLoading ? (
            [...Array(20)].map((_, index) => (
              <Skeleton key={index} height={"312px"} width={"100%"} />
            ))
          ) : data && data.length > 0 ? (
            data.map((nft, index) => (
              <ProfileItemCard
                key={index}
                showModal={() => {
                  setSelectedNFT(nft);
                  open();
                }}
                nft={nft}
              />
            ))
          ) : (
            <Text>You currently don&lsquo;t have any NFTs in this wallet</Text>
          )}
        </SimpleGrid>

        {selectedNFT && (
          <Modal
            opened={opened}
            onClose={close}
            title="Create listing"
            size={"xl"}
          >
            <Grid grow>
              <GridCol className="h-[25rem] rounded-md" span={1}>
                <ThirdwebNftMedia
                  metadata={selectedNFT.metadata}
                  className="!object-cover rounded-md !w-full !h-full"
                />
              </GridCol>
              <GridCol span={2}>
                <ListingForm close={close} nft={selectedNFT} />
              </GridCol>
            </Grid>
          </Modal>
        )}
      </Box>
    </Layout>
  );
}

export default Sell;
