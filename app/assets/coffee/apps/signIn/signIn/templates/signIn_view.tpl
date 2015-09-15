<!-- header[[ -->
<header class="bar bar-nav">
    <a class="icon icon-left-nav pull-left"></a>
    <a class="icon pull-right" href="#signUp">注册</a>
    <h1 class="title">登录</h1>
</header>
<!-- ]]header -->

<!-- Main[[ -->
<div class="main">
    <div class="main-sign-in">
        <!-- signIn[[ -->
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
        <!-- ]]signIn-->

        <% if(isSignIn){ %>
        <!-- other way[[ -->
        <nav class="bar bar-standard bar-footer bar-sign-in">
            <span class="pos-top text-center">第三方登录</span>
            <nav class="bar bar-tab">
                <a class="tab-item" href="#">
                    <span id="qqLoginBtn" class="icon"></span>
                    <span class="tab-label">QQ</span>
                </a>
                <a class="tab-item" href="#">
                    <span class="icon icon-person"></span>
                    <span class="tab-label">微信</span>
                </a>
                <a class="tab-item" href="#">
                    <span class="icon icon-star-filled"></span>
                    <span class="tab-label">新浪微博</span>
                </a>
            </nav>
        </nav>
        <!-- ]]other way -->
        <% } %>
    </div>
</div>
<!-- ]]Main -->