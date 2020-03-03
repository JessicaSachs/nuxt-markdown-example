<template>
  <div>
    The parent is here
    <h1>Hello there</h1>
    <p>This is an example of a named views</p>
    <router-link to="/test/123">Child 123</router-link>
    <div class="left">
      <NuxtChild name="left" />
    </div>
    <div class="content">
      <NuxtChild />
    </div>
  </div>
</template>
