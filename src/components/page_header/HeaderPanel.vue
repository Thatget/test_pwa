<template>
<div class="d-flex flex-row-reverse" style="background-color: #6e716e; color: #ffffff;">
    <div class="d-flex p-2">
        <strong class="language-USD">
            <span>USD - US Dollar</span>
        </strong>
        <button type="button" class="dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span class="sr-only">Toggle Dropdown</span>
        </button>
        <div class="dropdown-menu">
            <ul class="nav" >
                <li class="currency-EUR switcher-option">
                    <a href="#" style="color: #333333 !important;">EUR - Euro</a>
                </li>
            </ul>
        </div>
    </div>
    <ul class="nav nav-pills">
    <li class="p-2">
        <span class="not-logged-in" data-bind="html: 'Default welcome msg!'">Default welcome msg!</span>
    </li>
    <li class="p-2">
        <a href="#">Sign In</a>
    </li>
    <li class="p-2">
        <a href="#">Create an Account</a>
    </li>
    </ul>
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
</style>
