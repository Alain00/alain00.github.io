

export const Experience = () => {
  return (
		<section className="mb-12 max-w-[800px] mx-auto">
			<h2 className="text-6xl text-center mb-48 uppercase font-bold font-pixel">
				{"> "}
				<span className="text-invisible-partial">E</span>
				<span>xp</span>
				<span className="text-invisible-partial">erience</span>
				{" <"}
			</h2>
			<ul className="gap-4">
				<li>
					<h3 className="text-xl uppercase font-pixel">Freelance</h3>
					<p className="text-4xl uppercase font-pixel">Subzero Ice Services</p>

					<p className="mt-4">
					  Develop and maintain a web application that allows customers to make and track orders. A backoffice was also developed to manage orders, customers and inventory.
						Realtime maps were implemented to track the location of the delivery trucks.
					</p>
				</li>
			</ul>
		</section>
  )
}