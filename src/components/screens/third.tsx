import { Button } from "../ui/button"


export const ThirdScreen = () => {
	return (
		<div className="h-screen w-screen flex items-center justify-center flex-col text-2xl">
			<div className="flex flex-col items-center gap-4">
			<p>do u want to play a game?</p>
				<div className="flex justify-center gap-4">
					<Button>
						Sure!
					</Button>

					<Button variant={'destructive'}>
						No, thanks
					</Button>
				</div>
			</div>
		</div>
	)
}