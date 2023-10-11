import { html } from 'satori-html';

export const postTemplate = ({ imageUrl, title, summary, authorName, authorImage, badgeLabel, badgeColor }) => html`
	<div
		style="position: relative; width: 1200px; height: 630px; overflow: hidden; display: flex; flex-direction: column;"
	>
		<div
			style="display: flex; position: absolute; top: 0; right: 0; bottom: 0; left: 0; background-image: linear-gradient(to bottom right, gray, gray, #FF99DD);"
		></div>

		<div style="position: absolute; top: 0; right: 0; bottom: 0; left: 0; display: flex;">
			<img
				src="${imageUrl}"
				style="position: absolute; width: 100%; height: 100%; object-fit: cover; opacity: 0.3;"
				alt=""
			/>
			<div
				style="display: flex; position: absolute; top: 0; right: 0; bottom: 0; left: 0; background-image: linear-gradient(to right, gray, rgba(0,0,0,0.1)); mix-blend-mode: multiply;"
			></div>
		</div>

		<header
			style="position: absolute; top: 0; right: 0; bottom: 0; left: 0; display: flex; align-items: center; justify-content: center;"
		>
			<div style="position: relative; width: 900px; padding: 12px; display: flex; flex-direction: column;">
				<div
					style="display: flex; width: 100%; padding: 4px; border-color: #FF99DD; border-style: solid; border-width: 4px; border-radius: 12px;"
				>
					<div
						style="width: 100%; padding: 12px; background-color: white; border-top-left-radius: 5px; border-radius: 8px; display: flex; flex-direction: column;"
					>
						<h1 style="font-family: serif; font-size: 3rem; font-weight: 800; color: #1A202C;">${title}</h1>

						<p style="margin-top: 4px; font-family: display; font-size: 1rem; font-weight: 600; color: #6B7280;">
							${summary}
						</p>

						<div
							style="display: flex; align-items: center; justify-content: space-between; margin-top: 4px; border-top: 1px solid gray;"
						>
							<img src="${authorImage}" alt="${authorName}" style="width: 50px; height: 50px; border-radius: 50%;" />

							<span style="padding: 4px 8px; background-color: ${badgeColor || 'gray'}; border-radius: 4px;">
								${badgeLabel}
							</span>
						</div>
					</div>
				</div>
			</div>
		</header>
		<div style="position: absolute; top: 8px; right: 8px; display: flex;">
			<div style="width: 48px; height: 48px; color: white;">Logo</div>
		</div>
	</div>
`;
