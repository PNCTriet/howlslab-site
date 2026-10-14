import { PortfolioHome } from "@/components/portfolio-home";
import { getAllProjects, toCard } from "@/lib/projects";

export default function DemoPortfolioPage() {
  const cards = getAllProjects().map(toCard);
  return <PortfolioHome cards={cards} />;
}
