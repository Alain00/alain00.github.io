import { Face } from "../face"
import { LettersTransformer } from "../letters-transformer"
import { LightBulb } from "../light-bulb"
import { Tech } from "../tech"
import {MailIcon} from 'lucide-react'

export const Hero = () => {
  return (
		<>
			<section className="h-screen w-full flex items-center justify-center flex-col text-2xl">
				<div className="flex flex-col items-center gap-4">
					<div className="mb-12">
						<Face />
					</div>


					<div className="max-w-[600px] text-center uppercase font-pixel">
							<LettersTransformer>
								<p>
									Hi there! I'm <span className="font-bold">Alain</span>, a software engineer currently based in United States.8
									Passionate programmer since 2012. I love to build things and learn new technologies.
								</p>
							</LettersTransformer>
					</div>

					<div className="mt-6">
						<a className="font-pixel text-invisible hover:text-background/80" href="mailto:alain00.alvarez@gmail.com">
							<MailIcon className="w-5 h-5 inline-block mr-2" />
							alain00.alvarez@gmail.com
						</a>
					</div>

					<div className="flex gap-12 mt-12 grid grid-cols-4 justify-center items-center place-items-center">
						<Tech type="docker" />
						<Tech type="nestjs" />
						<Tech type="nextjs" />
						<Tech type="nodejs" />
						<div />
						<Tech type="react" />
						<Tech type="typescript" />
					</div>

					<div className="mt-12">
						<LightBulb />
					</div>
				</div>
			</section>
		</>
  )
}