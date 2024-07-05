import { GITHUB_REPO_LINK, PORTFOLIO_LINK } from "@/constants/appConstants";
import ImageWrapper from "../ImageWrapper";

export default function HomePageBranding() {
    return (
        <div>
            <a href={GITHUB_REPO_LINK} target="_blank" className="flex justify-center mb-3">
                <ImageWrapper src="github.svg" className="h-8 w-8" alt="github-icon" />
            </a>
            <p className="text-primary-800">Another project by <a href={PORTFOLIO_LINK} target="_blank" className="underline underline-offset-4">Vivek</a></p>
        </div>
    )
}