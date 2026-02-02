import { Footer } from "@/components/layout/Footer"
import { Navbar } from "@/components/layout/Navbar"



function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    )
}

export default AppLayout