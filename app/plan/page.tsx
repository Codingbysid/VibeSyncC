import PartyForm from "./components/PartyForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-200 to-pink-400 flex items-center justify-center">
      <div className="w-full max-w-4xl p-6">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-gray-800">
            Welcome to <span className="text-blue-500">PartyPlanner 🎉</span>
          </h1>
          <p className="text-lg text-gray-600 mt-4">
            Effortlessly organize the perfect party with our AI-powered planner.
          </p>
        </header>
        <PartyForm />
      </div>
    </div>
  );
}
