import { Footer } from "@/components/layout/Footer"
import { Navbar } from "@/components/layout/Navbar"



function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="container mx-auto px-4">
            <Navbar />
            {children}
            <Footer />
        </div>
    )
}

export default AppLayout