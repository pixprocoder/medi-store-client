import { FeaturedCategories, FeaturedMedicines, FeaturesSection, HeroSection, NewsletterSection } from "@/components/modules/homepage"

async function page() {
    return (
        <div >
            <HeroSection />
            <FeaturedMedicines />
            <FeaturedCategories />
            <FeaturesSection />
            <NewsletterSection />
        </div>
    )
}

export default page