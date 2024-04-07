// app/landing/page.tsx
import RootLayout from "../layout";

export default function LandingPage() {
  return (
    <RootLayout>
      <div className="flex justify-center items-center h-screen">
        <div className="w-24 h-24 bg-orange-500 rounded-full"></div>
      </div>
    </RootLayout>
  )
}