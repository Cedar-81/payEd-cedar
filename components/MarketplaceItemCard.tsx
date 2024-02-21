import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Group,
  Image,
  Paper,
  Skeleton,
  Text,
} from "@mantine/core";
import {
  DirectListingV3,
  ThirdwebNftMedia,
} from "@thirdweb-dev/react";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
  nft: DirectListingV3;
};

export default function MarketplaceItemCard({ nft }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const truncateNFTContractAddress = (
    address: string,
    startLength = 6,
    endLength = 4
  ) => {
    if (address.length !== 42) {
      return "Invalid Address";
    }

    const truncatedStart = address.slice(0, startLength);
    const truncatedEnd = address.slice(-endLength);

    return `${truncatedStart}...${truncatedEnd}`;
  };

  useEffect(() => {
    if (isLoading) {
      // Simulate an asynchronous operation (replace with your logic)
      const timeoutId = setTimeout(() => {
        // Redirect to the new page using router.push
        router.push(
          `/marketplace/token/${nft.assetContractAddress}/${nft.asset.id}`
        );
      }, 2000);

      // Cleanup the timeout to avoid memory leaks
      return () => clearTimeout(timeoutId);
    }
  }, [isLoading, nft.assetContractAddress, nft.asset.id, router]);

  // useEffect(() => {
  //    // Reset loading state to false after the operation completes
  //    setIsLoading(false);
  // })

  const handleButtonClick = () => {
    // Set loading state to true when button is clicked
    setIsLoading(true);
  };

  return (
    <Paper withBorder radius="md" className=" overflow-hidden">
      <Box className="h-[10rem] overflow-hidden">
        <ThirdwebNftMedia metadata={nft.asset} className="!object-cover !w-full !h-full" />
      </Box>
      <Box className="space-y-4 px-4 py-4">
        <Box>
          <Text size="lg" className="font-medium">
            {nft.asset.name}
          </Text>
          <Text size="sm">
            created by: <span>{truncateNFTContractAddress(nft.creatorAddress)}</span>
          </Text>
        </Box>
        <Skeleton></Skeleton>
        <Group justify="space-between">
          <Box>
            <Text size="sm">Price:</Text>
            <Text size="lg">{`${nft.currencyValuePerToken.displayValue} ${nft?.currencyValuePerToken.symbol}`}</Text>
          </Box>
          <Button
            variant="default"
            className="border-purple-800 text-purple-800 "
            onClick={handleButtonClick}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "View"}
          </Button>
        </Group>
      </Box>
    </Paper>
  );
}
