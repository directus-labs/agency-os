<script setup lang="ts">
export interface OgImageProps {
	imageUrl?: string;
	title?: string;
	summary?: string;
	authorName?: string;
	authorImage?: string;
	badgeLabel?: string;
	badgeColor?: string;
}

defineProps<OgImageProps>();

// inherited attrs can mess up the satori parser
defineOptions({
	inheritAttrs: false,
});

const fonts = {
	display: 'Poppins',
	body: 'Inter',
};
</script>
<template>
	<div
		:style="{
			display: 'flex',
			flexDirection: 'column',
			position: 'relative',
			width: '100%',
			height: '100%',
			overflow: 'hidden',
		}"
	>
		<div
			:style="{
				background: 'linear-gradient(to bottom right, #1F2937, #FF99DD)',
				position: 'absolute',
				inset: '0px',
				width: '100%',
				height: '100%',
			}"
		/>
		<div
			v-if="imageUrl"
			:style="{
				position: 'absolute',
				inset: '0px',
				width: '100%',
				height: '100%',
				overflow: 'hidden',
			}"
		>
			<img
				:src="imageUrl"
				:style="{
					objectFit: 'cover',
					objectPosition: 'center',
					width: '100%',
					height: '100%',
					filter: 'grayscale(100%)',
					opacity: '0.3',
				}"
			/>
		</div>
		<div
			:style="{
				display: 'flex',
				position: 'absolute',
				justifyContent: 'center',
				alignItems: 'center',
				inset: '0px',
				width: '100%',
				height: '100%',
			}"
		>
			<!-- Title Container -->
			<div
				:style="{
					position: 'relative',
					width: '1000px',
					padding: '3rem',
					display: 'flex',
					flexDirection: 'column',
				}"
			>
				<div
					:style="{
						position: 'relative',
						width: '100%',
						padding: '0.5rem',
						display: 'flex',
						flexDirection: 'column',
						border: '4px solid #FF99DD',
						borderRadius: '1rem',
					}"
				>
					<div
						:style="{
							position: 'relative',
							width: '100%',
							padding: '2.5rem',
							display: 'flex',
							flexDirection: 'column',
							borderRadius: '0.5rem',
							backgroundColor: '#ffffff',
						}"
					>
						<h1
							v-if="title"
							:style="{
								fontFamily: fonts.display,
								fontSize: '4rem',
								fontWeight: '700',
								lineHeight: '0.9',
								color: '#111827',
							}"
						>
							{{ title }}
						</h1>
						<p
							v-if="summary"
							:style="{
								fontFamily: fonts.body,
								fontSize: '1.5rem',
								fontWeight: '400',
								lineHeight: '1.5',
								color: '#334155',
								marginTop: '1rem',
							}"
						>
							{{ truncateString(summary, 100) }}
						</p>
						<!-- Footer with Page Author and Badge -->
						<div
							:style="{
								display: 'flex',
								alignItems: 'center',
								marginTop: '1rem',
								paddingTop: '1rem',
								borderTop: '1px solid #E5E7EB',
								justifyContent: 'space-between',
							}"
						>
							<!-- Author -->
							<div
								:style="{
									display: 'flex',
									alignItems: 'center',
								}"
							>
								<div
									:style="{
										marginRight: '0.5rem',
									}"
								>
									<img
										:style="{
											objectFit: 'cover',
											objectPosition: 'center',
											width: '3rem',
											height: '3rem',
											borderRadius: '9999px',
										}"
										:src="authorImage"
									/>
								</div>

								<div
									:style="{
										fontFamily: fonts.display,
										fontSize: '1.5rem',
										fontWeight: '400',
										lineHeight: '1.5',
										color: '#111827',
									}"
								>
									{{ authorName }}
								</div>
							</div>
							<!-- Badge -->
							<div
								:style="{
									fontFamily: fonts.display,
									fontSize: '1rem',
									fontWeight: '500',
									backgroundColor: '#4B5563',
									color: '#ffffff',
									display: 'flex',
									alignItems: 'center',
									padding: '0.5rem 1rem',
									borderRadius: '.5rem',
								}"
							>
								{{ badgeLabel }}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- Logo Top Right -->
		<Logo
			:style="{
				position: 'absolute',
				top: '1rem',
				right: '1rem',
				width: '100%',
				objectFit: 'contain',
				maxWidth: '12rem',
				height: '3rem',
				color: '#ffffff',
			}"
		/>
	</div>
</template>
