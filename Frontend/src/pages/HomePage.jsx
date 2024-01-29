import Cards from "../components/Cards/Cards"

const HomePage = () => {
  return (
    <div className="min-h-screen w-screen flex flex-col items-center gap-10 mt-6 mb-10 font-bold">
      <h1 className="mx-auto border-b-4 border-yellow-500 text-xl">LAS MEJORES OFERTAS</h1>
      <Cards />
    </div>
  )
}

export default HomePage