<template>
<div style="background-color: #6e716e; color: #ffffff;">
    <div class="d-flex flex-row-reverse container">
        <div class="d-flex p-2">
            <span class="dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            USD - US Dollar
            </span>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="p-3" href="#">EUR - Euro</a>
            </div>
        </div>
        <ul class="nav nav-pills">
        <li class="p-2">
            <span class="not-logged-in" data-bind="html: 'Default welcome msg!'">Default welcome msg!</span>
        </li>
        <li class="p-2">
            <router-link :to="{ name: 'Home', query: { pageType: 'customer' }}">Sign In</router-link>
        </li>
        <li class="p-2">
            <a href="#">Create an Account</a>
        </li>
        </ul>
    </div>
</div>
</template>

<script>
export default {

}
</script>

<style scoped>
li a {
    color: #ffffff;
    text-decoration: none;
}
a.dropdown-menu {
    background-color:red;
}
</style>
