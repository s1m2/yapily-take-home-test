<template>
  <main class="grid mx-4 max-w-screen-xl md:mx-auto mt-10 text-white place-items-center h-dvh">
    <h1 class="text-8xl font-extrabold">Error 404</h1>
    <p data-cy="error-message" class="font-semibold text-6xl">Sorry, we couldn't find that page</p>
    <RouterLink
      data-cy="go-back-home"
      to="/"
      class="font-semibold text-3xl bg-red-600 hover:bg-red-400 p-4 -skew-x-6 text-white"
      >Go back to Home</RouterLink
    >
  </main>
</template>
