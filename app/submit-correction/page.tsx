import SubmitCorrectionForm from "@/components/corrections/SubmitCorrectionForm"

export const metadata = {
  title: "Submit a correction · DinkBank",
  description: "Report a data issue so we can verify and update DinkBank's records.",
}

export default function SubmitCorrectionPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <SubmitCorrectionForm />
    </div>
  )
}
