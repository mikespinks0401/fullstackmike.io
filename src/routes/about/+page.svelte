<svelte:head>
	<title>About</title>
</svelte:head>

<div>
	<div class="container mx-auto">
		<div class="flex flex-col justify-center">
			<h1 data-test="about-title" class="text-4xl text-center pt-4">About</h1>
			<div class="mb-12 px-4 lg:px-0">

				<div class="flex justify-center py-2">
					<div class="h-72 w-56 med:h-72 med:w-56 overflow-hidden relative">
						<img
							src="/about-me-michael-spinks.jpg"
							class="w-full absolute "
							alt="Michael Spinks Photo"
						/>
					</div>
				</div>

				<p>
					Hello there. I have always had a deep interest in programming, and although I didn't fully commit to
					learning until my late 20s, technology has been a passion of mine since I assembled my
					first computer at the age of 17. The desire to have the knowledge to create my own SAAS
					product drove me to pursue a career as a full stack developer.
				</p>
				<p>
					Over the course of my four years of learning, I have acquired a diverse set of programming
					languages and technologies. From PHP, HTML, CSS, and JavaScript to React, Tailwind, Vue 3,
					Nuxt 3, Node, Nginx, TypeScript, Git, MySQL, Cypress, GitHub Actions, JWT, Vuetify 3, Go,
					Svelte, and SvelteKit, I have explored a wide range of tools and frameworks that have
					shaped my skill set.
				</p>
				<p>
					One of the most rewarding aspects of programming is facing the challenges that come with
					adopting new technologies. I vividly remember spending two weeks unraveling the
					complexities of implementing an authentication system with JWT in Nuxt 3. Through
					perseverance and the ability to slow down and think critically, I have developed
					problem-solving skills that enable me to tackle any obstacle.
				</p>
				<p>
					While I appreciate both front-end and back-end development, I find myself particularly
					drawn to the backend, as it is where the magic happens—the intricate mechanisms behind the
					scenes that power applications and make them come alive.
				</p>
				<p>
					While I have primarily pursued my programming journey independently, I am eager to
					collaborate and learn from other developers. Being part of an awesome team of passionate
					programmers is one of my future goals as a full stack developer. Additionally, I aspire to
					dive deeper into Svelte and Go, sharpen my skills in TDD (Test-Driven Development), and
					deliver top-quality software.
				</p>
				<p>
					To stay up to date with the latest trends, I follow various tech-related YouTube channels
					that keep me informed and inspired. When learning a new technology, I start by watching
					recent videos to familiarize myself with its practical applications. I then dive into the
					documentation, supplementing my learning with targeted Google searches when needed.
				</p>
				<p>
					One project that holds personal significance to me is a fitness application I developed in
					2020 using JavaScript and a strap-on heart rate monitor. This project gained importance
					when my family was impacted by COVID, and we became more focused on our heart health. I
					hope to recreate the app with an enhanced design to further promote wellness.
				</p>
				<p>
					As a self-taught developer, I take pride in my ability to overcome challenges and find
					solutions independently. My dedication to delivering secure and robust code sets me apart,
					as I consistently strive to ensure that my work is free of vulnerabilities.
				</p>
				<p>
					Looking ahead, I am excited about continuous learning and growth in the programming field.
					One of my contributions to the community will be sharing tutorials that assist aspiring
					developers on their learning journey, as I believe in giving back and helping others
					succeed.
				</p>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	p {
		@apply py-1;
	}
</style>
