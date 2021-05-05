<template>
  <div id="user-info">
    <a href="#" class="clearfix">
      <slot name="user-icon">
        <img src="~assets/img/profiles/profile.png" alt="" class="privateImage left"> 
      </slot>
      <div class="login-info left">
        <slot name="user-nickname">
          <div>登录/注册</div>
        </slot>
        <div class="phone">
          <span class="phone-span">
            <img src="~assets/img/profiles/phone.png" alt="" class="icon-mobile">
          </span>
          <slot name="user-phone">暂无绑定手机号</slot>
        </div>
      </div>
      <img src="~assets/img/profiles/right.png" alt="" class="arrow-svg right">
    </a>
  </div>
</template>

<script>
	export default {
		name: "UserInfo"
	}
</script>

<style scoped>
  #user-info {
    background-color: #f37d0f;
    padding: 15px;
    margin-top: -5px;
    /* border-top: 1px solid #333; */
  }

  #user-info .privateImage {
    width: 60px;
    height: 60px;
    background-color: #fff;
    border-radius: 30px;
  }

  .left {
    float: left;
  }

  #user-info .arrow-svg {
    width: 11px;
    height: 22px;
    margin-top: 18px;
  }

  #user-info .login-info {
    color: #fff;
    margin: 10px 0 0 10px;
  }

  #user-info .login-info .phone {
    position: relative;

    font-size: 13px;
    margin-top: 5px;
    margin-left: 15px;
    font-weight: 300;
  }

  #user-info .login-info .phone .icon-mobile {
    position: absolute;
    width: 12px;
    height: 18px;
    left: -15px;
    top: 0px;
  }
  .phone-span{
    position: relative;
  }
</style>
