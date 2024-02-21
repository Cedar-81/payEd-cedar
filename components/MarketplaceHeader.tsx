import {
  Title,
  Text,
  Button,
  Container,
  Paper,
  Box,
  Group,
  Avatar,
} from "@mantine/core";
import classes from "../styles/HeroText.module.css";
import MarketplaceInfoCard from "./MarketplaceInfoCard";
import {
  IconAsset,
  IconGavel,
  IconSchool,
  IconSocial,
} from "@tabler/icons-react";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import Link from "next/link";

export function MarketplaceHeader() {
  const info = [
    {
      key: 1,
      size: "124k",
      title: "Assets",
      icon: IconAsset,
      color: "pink",
    },
    {
      key: 2,
      size: "24k",
      title: "Collections",
      icon: IconSocial,
      color: "green",
    },
    {
      key: 1,
      size: "94k",
      title: "Schools",
      icon: IconSchool,
      color: "orange",
    },
    {
      key: 1,
      size: "168k",
      title: "Auctions",
      icon: IconGavel,
      color: "yellow",
    },
  ];
  const address = useAddress();
  return (
    <Paper
      withBorder
      className=" mt-12 m-6 border-2 rounded-md pt-8 px-8 pb-12"
    >
      <Group justify="space-between">
        <Box className="space-y-2">
          <Group align="end">
            <h1 className="!text-3xl font-medium">PayEd NFT Marketplace</h1>
            <ConnectWallet className="border-purple-700 border-2 text-purple-700" />
            {/* <Button
              variant="default"
              className="border-purple-700 text-purple-700"
            >
              Connect wallet
            </Button> */}
          </Group>
          <Text className="leading-5 text-sm">
            Digitize and sell/auction school assets for temporary or permanent{" "}
            <br />
            ownerships
          </Text>
        </Box>
        <Group>
          {/* <Button variant="default">Search</Button> */}
          {address && (
            <Link href={`/profile/${address}`}>
              <Button
                variant="default"
                radius="md"
                size="md"
                className="bg-purple-800 text-white"
              >
                Load Wallet NFTs
              </Button>
            </Link>
          )}
        </Group>
      </Group>

      <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {info.map((item, index) => (
          <MarketplaceInfoCard key={index} item={item} />
        ))}
      </div>
    </Paper>
  );
}
