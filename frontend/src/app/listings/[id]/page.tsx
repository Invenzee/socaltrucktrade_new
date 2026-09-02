import { notFound } from "next/navigation";
import ListingDetailView from "@/components/listings/listing-detail-view";
import { getListingById } from "@/data/listings";

type ListingDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ListingDetailPage({
  params,
}: ListingDetailPageProps) {
  const { id } = await params;
  if (!id) notFound();

  const listing = getListingById(id);

  return <ListingDetailView listing={listing} />;
}
