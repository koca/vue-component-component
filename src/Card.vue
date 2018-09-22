<template>
  <div class="card">
    <slot />
  </div>
</template>
<style>
.card {
  box-shadow: 0 0 20px -5px rgba(0, 0, 0, 0.4);
  max-width: 500px;
  padding: 10px 20px 20px 20px;
  border-radius: 5px;
  margin: 25px auto;
  background: white;
}
</style>
