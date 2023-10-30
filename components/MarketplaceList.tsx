import { Box, Group, SimpleGrid, Skeleton, Text } from "@mantine/core";
import MarketplaceItemCard from "./MarketplaceItemCard";
import { DirectListingV3 as NFTType } from "@thirdweb-dev/sdk";
import Link from "next/link";
import { NFT_COLLECTION_ADDRESS } from "../const/addresses";

type Props = {
  isLoading: boolean;
  data: NFTType[] | undefined;
  overideOnClickBehavior?: (nft: NFTType) => void;
  emptyText?: string;
};

export default function MarketplaceList({
  isLoading,
  data,
  overideOnClickBehavior,
  emptyText,
}: Props) {
  const items = [
    {
      title: "School mascot",
      price: "800",
    },
    {
      title: "School wearable",
      price: "500",
    },
    {
      title: "School building 1",
      price: "900",
    },
    {
      title: "School tree",
      price: "300",
    },
  ];

  return (
    <Box className="relative space-y-4 px-8 pb-10">
      <Text className="text-2xl">Discover</Text>
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}>
        {isLoading ? (
          [...Array(20)].map((_, index) => (
            <Skeleton key={index} height={"312px"} width={"100%"} />
          ))
        ) : data && data.length > 0 ? (
          data.map((nft, index) =>
            !overideOnClickBehavior ? (
              <MarketplaceItemCard key={index} nft={nft} />
            ) : (
              <div
                key={nft.asset.id}
                onClick={() => overideOnClickBehavior(nft)}
              ></div>
            )
          )
        ) : (
          <Text>{emptyText}</Text>
        )}
      </SimpleGrid>
    </Box>
  );
}
