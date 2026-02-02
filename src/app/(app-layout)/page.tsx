import { FeaturedCategories, FeaturedMedicines, FeaturesSection, HeroSection, NewsletterSection } from "@/components/modules/homepage"

function page() {
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