<!-- header[[ -->
<header class="bar bar-nav">
    <a class="icon icon-left-nav pull-left"></a>
    <a class="icon pull-right" href="#">登录</a>
    <h1 class="title">注册</h1>
</header>
<!-- ]]header -->

<!-- Main[[ -->
<div class="main">
    <div class="main-sign-in">
        <!-- signUp[[ -->
        <ul class="io-list">
            <li>
                <span class="img-widget"></span>
                <span class="icon-cus icon-user-hover"></span>
                <input id="getAccount" type="text" placeholder="<%=account%>">
            </li>
            <li>
                <span class="icon-cus icon-lock"></span>
                <input id="getPassword" type="text" placeholder="<%=password%>">
                <button id="getPasswordFromServer" class="btn btn-primary btn-captcha">获取验证码</button>
            </li>
        </ul>
        <button id="sendRequest" class="btn btn-negative btn-outlined btn-block" type="button">确定</button>
        <!-- ]]signUp-->
    </div>
</div>
<!-- ]]Main -->