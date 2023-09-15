<script setup lang="ts">
definePageMeta({
	layout: 'app',
});
</script>
<template>
	<div>
		<div class="px-4 py-3 bg-gray-200 rounded-tr-lg rounded-bl-lg md:flex md:items-center md:justify-between">
			<div class="flex-1 min-w-0">
				<TypographyHeadline content="Messages" />
			</div>
			<div class="flex mt-4 md:ml-4 md:mt-0">
				<VButton variant="primary">Action</VButton>
			</div>
		</div>
		<!-- Copy Pasted -->
		<main class="">
			<div class="">
				<!---->
				<div class="">
					<div class="overflow-hidden bg-white">
						<div class="flex h-[calc(100vh-4rem)] border bg-white 2xl:rounded-md">
							<div class="shrink-0 border-r w-full lg:w-[309px]">
								<div class="flex h-[70px] items-center justify-between border-b p-6">
									<h5 class="text-lg font-bold text-gray-900">Chats</h5>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
										aria-hidden="true"
										class="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-500 v-popper--has-tooltip"
									>
										<path
											fill-rule="evenodd"
											d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
											clip-rule="evenodd"
										></path>
									</svg>
									<!---->
								</div>
								<div class="h-[calc(100%-70px)] overflow-y-auto 2xl:rounded-md">
									<div class="flex flex-col items-center justify-center px-4 py-9">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="w-12 h-12 mb-5 text-gray-500 icon-tabler icon-tabler-messages"
											width="24px"
											height="24px"
											viewBox="0 0 24 24"
											stroke-width="2"
											stroke="currentColor"
											fill="none"
											stroke-linecap="round"
											stroke-linejoin="round"
										>
											<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
											<path d="M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10"></path>
											<path d="M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2"></path>
										</svg>
										<h5 class="mb-4 text-lg font-bold text-gray-900">No chat yet</h5>
										<button
											type="button"
											class="items-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none"
										>
											Create a new chat
										</button>
									</div>
								</div>
							</div>
							<div class="flex flex-col hidden w-full overflow-x-hidden md:flex">
								<div class="flex items-center justify-center flex-auto">
									<div class="text-center">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="w-12 h-12 mx-auto text-gray-500 icon-tabler icon-tabler-message-chatbot"
											width="24px"
											height="24px"
											viewBox="0 0 24 24"
											stroke-width="2"
											stroke="currentColor"
											fill="none"
											stroke-linecap="round"
											stroke-linejoin="round"
										>
											<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
											<path d="M4 21v-13a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-9l-4 4"></path>
											<path d="M9.5 9h.01"></path>
											<path d="M14.5 9h.01"></path>
											<path d="M9.5 13a3.5 3.5 0 0 0 5 0"></path>
										</svg>
										<h5 class="mt-5 text-lg font-semibold text-gray-900">Select a conversation</h5>
										<button
											type="button"
											class="items-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none"
										>
											Create a new chat
										</button>
									</div>
								</div>
								<div
									class="flex items-start p-6 mt-auto space-x-4 border-t border-gray-200 shrink-0 bg-gray-50 2xl:rounded-b-md"
								>
									<div class="relative flex-1 min-w-0">
										<form>
											<div
												class="w-full pt-2 bg-white border border-gray-300 rounded-md shadow-sm"
												show-buttons-toggler="true"
											>
												<!---->
												<div class="w-full p-0 overflow-y-auto max-h-52">
													<div
														contenteditable="true"
														translate="no"
														class="px-4 py-2 text-sm prose ProseMirror prose-base max-w-none focus:outline-none"
														tabindex="0"
													>
														<p class="is-empty is-editor-empty"><br class="ProseMirror-trailingBreak" /></p>
													</div>
												</div>
												<!---->
												<div class="flex justify-between px-2 pb-1">
													<div class="flex space-x-1">
														<label for="files" class="flex items-center">
															<div>
																<button
																	type="button"
																	class="flex items-center justify-center p-1 text-gray-400 rounded-full hover:text-gray-500"
																>
																	<svg
																		xmlns="http://www.w3.org/2000/svg"
																		fill="none"
																		viewBox="0 0 24 24"
																		stroke-width="2"
																		stroke="currentColor"
																		aria-hidden="true"
																		class="w-5 h-5"
																	>
																		<path
																			stroke-linecap="round"
																			stroke-linejoin="round"
																			d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
																		></path>
																	</svg>
																	<span class="sr-only">Attach a file</span>
																</button>
															</div>
															<input id="files" type="file" name="files[]" class="sr-only" multiple="" />
														</label>
														<div data-headlessui-state="" class="relative flex items-center">
															<button
																id="headlessui-popover-button-3418"
																type="button"
																aria-expanded="false"
																data-headlessui-state=""
															>
																<button
																	type="button"
																	class="flex items-center justify-center p-1 text-gray-400 rounded-full hover:text-gray-500 focus-visible:ring-0"
																>
																	<svg
																		xmlns="http://www.w3.org/2000/svg"
																		class="w-5 h-5 icon-tabler icon-tabler-mood-happy"
																		width="24px"
																		height="24px"
																		viewBox="0 0 24 24"
																		stroke-width="2"
																		stroke="currentColor"
																		fill="none"
																		stroke-linecap="round"
																		stroke-linejoin="round"
																		aria-hidden="true"
																	>
																		<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
																		<path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
																		<path d="M9 9l.01 0"></path>
																		<path d="M15 9l.01 0"></path>
																		<path d="M8 13a4 4 0 1 0 8 0h-8"></path>
																	</svg>
																	<span class="sr-only">Insert a emoji</span>
																</button>
															</button>
															<!---->
															<!---->
														</div>
														<button
															type="button"
															class="flex items-center justify-center p-1 text-gray-400 rounded-full hover:text-gray-500 focus-visible:ring-0"
														>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																class="w-5 h-5 icon-tabler icon-tabler-letter-case"
																width="24px"
																height="24px"
																viewBox="0 0 24 24"
																stroke-width="2"
																stroke="currentColor"
																fill="none"
																stroke-linecap="round"
																stroke-linejoin="round"
																aria-hidden="true"
															>
																<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
																<path d="M17.5 15.5m-3.5 0a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0 -7 0"></path>
																<path d="M3 19v-10.5a3.5 3.5 0 0 1 7 0v10.5"></path>
																<path d="M3 13h7"></path>
																<path d="M21 12v7"></path>
															</svg>
															<span class="sr-only">Insert a emoji</span>
														</button>
													</div>
													<div class="shrink-0">
														<button
															type="submit"
															class="px-4 py-3 -mx-4 -my-3 text-gray-400 cursor-not-allowed focus:outline-none focus:ring-0"
														>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																viewBox="0 0 20 20"
																fill="currentColor"
																aria-hidden="true"
																class="w-6 h-6 rotate-90"
															>
																<path
																	d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
																></path>
															</svg>
														</button>
													</div>
												</div>
											</div>
											<div class="absolute text-xs text-gray-400 -top-5"><!----></div>
										</form>
									</div>
								</div>
								<!---->
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	</div>
</template>
