import CompanyDashboard from "@/components/CompanyDashboard";

const API_URL = "https://organisational-berget-brauliorivas-2b6dec69.koyeb.app";

async function getCompany(id) {
  const response = await fetch(`${API_URL}/clients/${id}`);
  return response.json();
}

export default async function page({ params }) {
  const data = await getCompany(params.slug);

  return <CompanyDashboard data={data} />;
}
