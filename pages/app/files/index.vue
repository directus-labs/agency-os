<script setup lang="ts">
definePageMeta({
	layout: 'app',
});
</script>
<template>
	<div>
		<div class="px-4 py-3 bg-gray-200 rounded-tr-lg rounded-bl-lg md:flex md:items-center md:justify-between">
			<div class="flex-1 min-w-0">
				<TypographyHeadline content="Files" />
			</div>
			<div class="flex mt-4 md:ml-4 md:mt-0">
				<VButton variant="primary">Action</VButton>
			</div>
		</div>
		<!-- Copy Pasted -->
		<div class="p-6 bg-white">
			<div>
				<div class="space-y-6">
					<div class="flex items-center justify-end">
						<div class="flex space-x-3">
							<div data-headlessui-state="" class="relative inline-block text-left">
								<div>
									<button
										id="headlessui-menu-button-3327"
										type="button"
										aria-haspopup="true"
										aria-expanded="false"
										data-headlessui-state=""
									>
										<button
											type="button"
											class="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 20 20"
												fill="currentColor"
												aria-hidden="true"
												class="w-5 h-5 text-gray-400 md:mr-2"
											>
												<path
													fill-rule="evenodd"
													d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
													clip-rule="evenodd"
												></path>
											</svg>
											<span class="hidden md:block">New</span>
										</button>
									</button>
								</div>
								<!---->
							</div>
							<button
								type="button"
								class="flex items-center px-4 py-2 text-sm font-medium text-gray-400 bg-white border border-gray-300 rounded-md shadow-sm cursor-not-allowed hover:bg-gray-50 focus:outline-none"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
									class="w-5 h-5 text-gray-300 md:mr-2"
								>
									<path
										fill-rule="evenodd"
										d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
										clip-rule="evenodd"
									></path>
								</svg>
								<span class="hidden md:block">Download all files</span>
							</button>
						</div>
					</div>
					<div>
						<div class="items-center hidden text-sm font-medium leading-5 text-gray-500 lg:flex">
							<a class="" href="https://letterboxsigndesign.manyrequests.io/filesystem?filesystem_path=organization">
								Storage
							</a>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
								class="w-4 h-4 mx-3 text-gray-400"
							>
								<path
									fill-rule="evenodd"
									d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
									clip-rule="evenodd"
								></path>
							</svg>
							<a
								class="truncate"
								href="https://letterboxsigndesign.manyrequests.io/filesystem?filesystem_path=organization.requests"
							>
								Jobs
							</a>
							<!---->
						</div>
						<div class="bg-white lg:hidden">
							<a
								class="flex items-center"
								href="https://letterboxsigndesign.manyrequests.io/filesystem?filesystem_path=organization"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="2"
									stroke="currentColor"
									aria-hidden="true"
									class="w-6 h-6 mr-2 text-gray-400"
								>
									<path stroke-linecap="round" stroke-linejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path>
								</svg>
								<span class="text-sm font-medium text-gray-500">Back to Storage</span>
							</a>
						</div>
					</div>
					<div class="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
						<div class="flex items-center">
							<input
								id="all"
								name="notification-method"
								type="radio"
								class="w-4 h-4 border-gray-300 cursor-pointer text-primary-600 focus:ring-0 focus:ring-primary-500 focus:ring-offset-0"
							/>
							<label for="all" class="block ml-3 text-sm font-medium text-gray-700 cursor-pointer">All files</label>
						</div>
						<div class="flex items-center">
							<input
								id="by-client"
								name="notification-method"
								type="radio"
								class="w-4 h-4 border-gray-300 cursor-pointer text-primary-600 focus:ring-0 focus:ring-primary-500 focus:ring-offset-0"
							/>
							<label for="by-client" class="block ml-3 text-sm font-medium text-gray-700 cursor-pointer">
								Uploaded by client
							</label>
						</div>
						<div class="flex items-center">
							<input
								id="by-agency"
								name="notification-method"
								type="radio"
								class="w-4 h-4 border-gray-300 cursor-pointer text-primary-600 focus:ring-0 focus:ring-primary-500 focus:ring-offset-0"
							/>
							<label for="by-agency" class="block ml-3 text-sm font-medium text-gray-700 cursor-pointer">
								Uploaded by agency
							</label>
						</div>
					</div>
				</div>
				<div class="relative">
					<div class="absolute w-full h-full rounded-md" style="display: none">
						<div class="absolute z-30 w-full h-full bg-gray-500 rounded-md opacity-50"></div>
						<form
							method="post"
							action="#"
							enctype="multipart/form-data"
							novalidate=""
							class="absolute z-40 flex items-center justify-center w-full h-full px-6 pt-5 pb-6 mt-0 mt-4 text-center text-white text-gray-500 transition-all duration-150 ease-in-out rounded-md has-advanced-upload js outline-dashed outline-2 outline-gray-300"
						>
							<div class="space-y-1 text-center">
								<svg class="w-12 h-12 mx-auto" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
									<path
										d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									></path>
								</svg>
								<div class="flex text-sm">
									<label
										class="relative font-medium rounded-md cursor-pointer text-primary-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 hover:text-primary-500"
									>
										<span>Upload a file</span>
										<input type="file" name="files[]" class="sr-only" multiple="" />
									</label>
									<p class="pl-1">or drag and drop</p>
								</div>
								<p class="text-xs">PNG, JPG, GIF up to 10MB</p>
							</div>
						</form>
					</div>
					<div class="mt-4">
						<div
							class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-5 xl:gap-x-8 2xl:grid-cols-7"
						>
							<div>
								<div class="relative leading-3 group-1">
									<div class="block w-full overflow-hidden border border-gray-100 rounded-md group">
										<div
											class="flex justify-center object-cover w-full border border-gray-200 rounded cursor-pointer aspect-square"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 20 20"
												fill="currentColor"
												aria-hidden="true"
												class="w-24 fill-yellow-300 mix-blend-darken"
											>
												<path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
											</svg>
										</div>
										<button type="button" class="absolute inset-0">
											<span class="sr-only">View details for Journey Church</span>
										</button>
									</div>
									<div class="mt-2">
										<div class="flex justify-between">
											<span class="text-sm font-medium text-gray-900 truncate">Journey Church</span>
											<!---->
										</div>
									</div>
									<!---->
								</div>
								<!---->
								<!---->
							</div>
							<div>
								<div class="relative leading-3 group-1">
									<div class="block w-full overflow-hidden border border-gray-100 rounded-md group">
										<div
											class="flex justify-center object-cover w-full border border-gray-200 rounded cursor-pointer aspect-square"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 20 20"
												fill="currentColor"
												aria-hidden="true"
												class="w-24 fill-yellow-300 mix-blend-darken"
											>
												<path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
											</svg>
										</div>
										<button type="button" class="absolute inset-0">
											<span class="sr-only">View details for MCCS Cherry Point Entry Sign (Large)</span>
										</button>
									</div>
									<div class="mt-2">
										<div class="flex justify-between">
											<span class="text-sm font-medium text-gray-900 truncate">
												MCCS Cherry Point Entry Sign (Large)
											</span>
											<!---->
										</div>
									</div>
									<!---->
								</div>
								<!---->
								<!---->
							</div>
							<div>
								<div class="relative leading-3 group-1">
									<div class="block w-full overflow-hidden border border-gray-100 rounded-md group">
										<div
											class="flex justify-center object-cover w-full border border-gray-200 rounded cursor-pointer aspect-square"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 20 20"
												fill="currentColor"
												aria-hidden="true"
												class="w-24 fill-yellow-300 mix-blend-darken"
											>
												<path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
											</svg>
										</div>
										<button type="button" class="absolute inset-0">
											<span class="sr-only">View details for Pure Gold - Greensboro</span>
										</button>
									</div>
									<div class="mt-2">
										<div class="flex justify-between">
											<span class="text-sm font-medium text-gray-900 truncate">Pure Gold - Greensboro</span>
											<!---->
										</div>
									</div>
									<!---->
								</div>
								<!---->
								<!---->
							</div>
							<div>
								<div class="relative leading-3 group-1">
									<div class="block w-full overflow-hidden border border-gray-100 rounded-md group">
										<div
											class="flex justify-center object-cover w-full border border-gray-200 rounded cursor-pointer aspect-square"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 20 20"
												fill="currentColor"
												aria-hidden="true"
												class="w-24 fill-yellow-300 mix-blend-darken"
											>
												<path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
											</svg>
										</div>
										<button type="button" class="absolute inset-0">
											<span class="sr-only">View details for Angry Chihauhau - New Bern</span>
										</button>
									</div>
									<div class="mt-2">
										<div class="flex justify-between">
											<span class="text-sm font-medium text-gray-900 truncate">Angry Chihauhau - New Bern</span>
											<!---->
										</div>
									</div>
									<!---->
								</div>
								<!---->
								<!---->
							</div>
							<div>
								<div class="relative leading-3 group-1">
									<div class="block w-full overflow-hidden border border-gray-100 rounded-md group">
										<div
											class="flex justify-center object-cover w-full border border-gray-200 rounded cursor-pointer aspect-square"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 20 20"
												fill="currentColor"
												aria-hidden="true"
												class="w-24 fill-yellow-300 mix-blend-darken"
											>
												<path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
											</svg>
										</div>
										<button type="button" class="absolute inset-0">
											<span class="sr-only">View details for Time Out Communities -Main Office Signs</span>
										</button>
									</div>
									<div class="mt-2">
										<div class="flex justify-between">
											<span class="text-sm font-medium text-gray-900 truncate">
												Time Out Communities -Main Office Signs
											</span>
											<!---->
										</div>
									</div>
									<!---->
								</div>
								<!---->
								<!---->
							</div>
							<div>
								<div class="relative leading-3 group-1">
									<div class="block w-full overflow-hidden border border-gray-100 rounded-md group">
										<div
											class="flex justify-center object-cover w-full border border-gray-200 rounded cursor-pointer aspect-square"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 20 20"
												fill="currentColor"
												aria-hidden="true"
												class="w-24 fill-yellow-300 mix-blend-darken"
											>
												<path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
											</svg>
										</div>
										<button type="button" class="absolute inset-0">
											<span class="sr-only">View details for C-Stone Church Pylon</span>
										</button>
									</div>
									<div class="mt-2">
										<div class="flex justify-between">
											<span class="text-sm font-medium text-gray-900 truncate">C-Stone Church Pylon</span>
											<!---->
										</div>
									</div>
									<!---->
								</div>
								<!---->
								<!---->
							</div>
							<div>
								<div class="relative leading-3 group-1">
									<div class="block w-full overflow-hidden border border-gray-100 rounded-md group">
										<div
											class="flex justify-center object-cover w-full border border-gray-200 rounded cursor-pointer aspect-square"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 20 20"
												fill="currentColor"
												aria-hidden="true"
												class="w-24 fill-yellow-300 mix-blend-darken"
											>
												<path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
											</svg>
										</div>
										<button type="button" class="absolute inset-0">
											<span class="sr-only">View details for Potters House Church</span>
										</button>
									</div>
									<div class="mt-2">
										<div class="flex justify-between">
											<span class="text-sm font-medium text-gray-900 truncate">Potters House Church</span>
											<!---->
										</div>
									</div>
									<!---->
								</div>
								<!---->
								<!---->
							</div>
							<div>
								<div class="relative leading-3 group-1">
									<div class="block w-full overflow-hidden border border-gray-100 rounded-md group">
										<div
											class="flex justify-center object-cover w-full border border-gray-200 rounded cursor-pointer aspect-square"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 20 20"
												fill="currentColor"
												aria-hidden="true"
												class="w-24 fill-yellow-300 mix-blend-darken"
											>
												<path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
											</svg>
										</div>
										<button type="button" class="absolute inset-0">
											<span class="sr-only">View details for MCAS-CP Airplane Park Signs</span>
										</button>
									</div>
									<div class="mt-2">
										<div class="flex justify-between">
											<span class="text-sm font-medium text-gray-900 truncate">MCAS-CP Airplane Park Signs</span>
											<!---->
										</div>
									</div>
									<!---->
								</div>
								<!---->
								<!---->
							</div>
							<div>
								<div class="relative leading-3 group-1">
									<div class="block w-full overflow-hidden border border-gray-100 rounded-md group">
										<div
											class="flex justify-center object-cover w-full border border-gray-200 rounded cursor-pointer aspect-square"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 20 20"
												fill="currentColor"
												aria-hidden="true"
												class="w-24 fill-yellow-300 mix-blend-darken"
											>
												<path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
											</svg>
										</div>
										<button type="button" class="absolute inset-0">
											<span class="sr-only">View details for Olympus Athletic Club</span>
										</button>
									</div>
									<div class="mt-2">
										<div class="flex justify-between">
											<span class="text-sm font-medium text-gray-900 truncate">Olympus Athletic Club</span>
											<!---->
										</div>
									</div>
									<!---->
								</div>
								<!---->
								<!---->
							</div>
							<div>
								<div class="relative leading-3 group-1">
									<div class="block w-full overflow-hidden border border-gray-100 rounded-md group">
										<div
											class="flex justify-center object-cover w-full border border-gray-200 rounded cursor-pointer aspect-square"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 20 20"
												fill="currentColor"
												aria-hidden="true"
												class="w-24 fill-yellow-300 mix-blend-darken"
											>
												<path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
											</svg>
										</div>
										<button type="button" class="absolute inset-0">
											<span class="sr-only">View details for Piggly Wiggly 72" Logo Set</span>
										</button>
									</div>
									<div class="mt-2">
										<div class="flex justify-between">
											<span class="text-sm font-medium text-gray-900 truncate">Piggly Wiggly 72" Logo Set</span>
											<!---->
										</div>
									</div>
									<!---->
								</div>
								<!---->
								<!---->
							</div>
							<div>
								<div class="relative leading-3 group-1">
									<div class="block w-full overflow-hidden border border-gray-100 rounded-md group">
										<div
											class="flex justify-center object-cover w-full border border-gray-200 rounded cursor-pointer aspect-square"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 20 20"
												fill="currentColor"
												aria-hidden="true"
												class="w-24 fill-yellow-300 mix-blend-darken"
											>
												<path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
											</svg>
										</div>
										<button type="button" class="absolute inset-0">
											<span class="sr-only">View details for Journey Church</span>
										</button>
									</div>
									<div class="mt-2">
										<div class="flex justify-between">
											<span class="text-sm font-medium text-gray-900 truncate">Journey Church</span>
											<!---->
										</div>
									</div>
									<!---->
								</div>
								<!---->
								<!---->
							</div>
							<div>
								<div class="relative leading-3 group-1">
									<div class="block w-full overflow-hidden border border-gray-100 rounded-md group">
										<div
											class="flex justify-center object-cover w-full border border-gray-200 rounded cursor-pointer aspect-square"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 20 20"
												fill="currentColor"
												aria-hidden="true"
												class="w-24 fill-yellow-300 mix-blend-darken"
											>
												<path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
											</svg>
										</div>
										<button type="button" class="absolute inset-0">
											<span class="sr-only">View details for Karmike</span>
										</button>
									</div>
									<div class="mt-2">
										<div class="flex justify-between">
											<span class="text-sm font-medium text-gray-900 truncate">Karmike</span>
											<!---->
										</div>
									</div>
									<!---->
								</div>
								<!---->
								<!---->
							</div>
							<div>
								<div class="relative leading-3 group-1">
									<div class="block w-full overflow-hidden border border-gray-100 rounded-md group">
										<div
											class="flex justify-center object-cover w-full border border-gray-200 rounded cursor-pointer aspect-square"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 20 20"
												fill="currentColor"
												aria-hidden="true"
												class="w-24 fill-yellow-300 mix-blend-darken"
											>
												<path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
											</svg>
										</div>
										<button type="button" class="absolute inset-0">
											<span class="sr-only">View details for Five Aprils Plaza</span>
										</button>
									</div>
									<div class="mt-2">
										<div class="flex justify-between">
											<span class="text-sm font-medium text-gray-900 truncate">Five Aprils Plaza</span>
											<!---->
										</div>
									</div>
									<!---->
								</div>
								<!---->
								<!---->
							</div>
							<div>
								<div class="relative leading-3 group-1">
									<div class="block w-full overflow-hidden border border-gray-100 rounded-md group">
										<div
											class="flex justify-center object-cover w-full border border-gray-200 rounded cursor-pointer aspect-square"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 20 20"
												fill="currentColor"
												aria-hidden="true"
												class="w-24 fill-yellow-300 mix-blend-darken"
											>
												<path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
											</svg>
										</div>
										<button type="button" class="absolute inset-0">
											<span class="sr-only">View details for Potters House</span>
										</button>
									</div>
									<div class="mt-2">
										<div class="flex justify-between">
											<span class="text-sm font-medium text-gray-900 truncate">Potters House</span>
											<!---->
										</div>
									</div>
									<!---->
								</div>
								<!---->
								<!---->
							</div>
							<div>
								<div class="relative leading-3 group-1">
									<div class="block w-full overflow-hidden border border-gray-100 rounded-md group">
										<div
											class="flex justify-center object-cover w-full border border-gray-200 rounded cursor-pointer aspect-square"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 20 20"
												fill="currentColor"
												aria-hidden="true"
												class="w-24 fill-yellow-300 mix-blend-darken"
											>
												<path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
											</svg>
										</div>
										<button type="button" class="absolute inset-0">
											<span class="sr-only">View details for Karmike</span>
										</button>
									</div>
									<div class="mt-2">
										<div class="flex justify-between">
											<span class="text-sm font-medium text-gray-900 truncate">Karmike</span>
											<!---->
										</div>
									</div>
									<!---->
								</div>
								<!---->
								<!---->
							</div>
						</div>
					</div>
					<nav
						class="flex items-center justify-between py-3 mt-4 -mx-4 border-t border-t-0 border-gray-200 sm:justify-end"
						aria-label="Pagination"
					>
						<div class="mr-2 text-sm text-gray-500">1-15 of 86</div>
						<div class="flex justify-between text-gray-500">
							<a
								class="relative inline-flex items-center px-4 py-2 text-sm rounded-md hover:bg-gray-100"
								href="https://letterboxsigndesign.manyrequests.io/filesystem?filesystem_path=organization.requests&amp;page=1"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
									class="w-5 h-5"
								>
									<path
										fill-rule="evenodd"
										d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z"
										clip-rule="evenodd"
									></path>
								</svg>
							</a>
							<span class="relative inline-flex items-center px-4 py-2 text-sm rounded-md cursor-not-allowed">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="2"
									stroke="currentColor"
									aria-hidden="true"
									class="w-6 h-6"
								>
									<path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"></path>
								</svg>
							</span>
							<a
								class="relative inline-flex items-center px-4 py-2 text-sm rounded-md hover:bg-gray-100"
								href="https://letterboxsigndesign.manyrequests.io/filesystem?filesystem_path=organization.requests&amp;page=2"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="2"
									stroke="currentColor"
									aria-hidden="true"
									class="w-6 h-6"
								>
									<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path>
								</svg>
							</a>
							<a
								class="relative inline-flex items-center px-4 py-2 text-sm rounded-md hover:bg-gray-100"
								href="https://letterboxsigndesign.manyrequests.io/filesystem?filesystem_path=organization.requests&amp;page=6"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
									class="w-5 h-5"
								>
									<path
										fill-rule="evenodd"
										d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
										clip-rule="evenodd"
									></path>
									<path
										fill-rule="evenodd"
										d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
										clip-rule="evenodd"
									></path>
								</svg>
							</a>
						</div>
					</nav>
					<!---->
				</div>
				<!---->
				<!---->
				<!---->
			</div>
		</div>
	</div>
</template>
