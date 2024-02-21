import {
  useActiveListings,
  useContract,
  useNFTs,
  useValidDirectListings,
} from "@thirdweb-dev/react";
import { MarketplaceHeader } from "../../components/MarketplaceHeader";
import MarketplaceList from "../../components/MarketplaceList";
import Layout from "../../components/layout";
import {
  MARKETPLACE_ADDRESS,
  NFT_COLLECTION_ADDRESS,
} from "../../const/addresses";

export default function Marketplace() {
  // const { contract } = useContract(MARKETPLACE_ADDRESS);
  // const { data, isLoading } = useNFTs(contract);
  const { contract } = useContract(MARKETPLACE_ADDRESS, "marketplace-v3");
  const { data, isLoading } = useValidDirectListings(contract);

  console.log(data, contract);

  return (
    <Layout>
      <div className="border-2 border-red-700">
        <MarketplaceHeader />
        <MarketplaceList
          isLoading={isLoading}
          data={data}
          emptyText={"No NFTs found"}
        />

      </div>
    </Layout>
  );
}
