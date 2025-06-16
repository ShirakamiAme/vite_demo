<template>
  <footer>
    <div class="container">
      <div class="footer-grid">
        <div class="footer-col">
          <h3>关于我们</h3>
          <p>绿意生活致力于为您提供最优质的有机、环保产品，倡导健康、可持续的生活方式。</p>
          <div class="social-links">
            <a href="#"><font-awesome-icon :icon="['fab', 'qq']" /></a>
            <a href="#"><font-awesome-icon :icon="['fab', 'weixin']" /></a>
            <a href="#"><font-awesome-icon :icon="['fab', 'github']" /></a>
            <a href="#"><font-awesome-icon :icon="['fab', 'cloudflare']" /></a>
          </div>
        </div>
        <div class="footer-col">
          <h3>购物指南</h3>
          <ul class="footer-links">
            <li><a href="#">购物流程</a></li>
            <li><a href="#">会员介绍</a></li>
            <li><a href="#">常见问题</a></li>
            <li><a href="#">联系客服</a></li>
            <li><a href="#">支付方式</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h3>配送服务</h3>
          <ul class="footer-links">
            <li><a href="#">配送说明</a></li>
            <li><a href="#">运费政策</a></li>
            <li><a href="#">签收须知</a></li>
            <li><a href="#">配送范围</a></li>
            <li><a href="#">物流查询</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h3>订阅资讯</h3>
          <div class="newsletter">
            <p>订阅获取最新优惠和健康资讯</p>
            <input type="email" placeholder="您的电子邮箱">
            <button class="btn" style="width: 100%;">订阅</button>
          </div>
        </div>
      </div>
      <div class="copyright">
        <p>Github <a href="http://gitub.com/ShirakamiAme" style="color: #dddddd; text-decoration: none; ">@ShirakamiAme</a>  and  <a href="https://github.com/math24-ai" style="color: #dddddd; text-decoration: none; ">@math24-ai</a> , All Rights Reserved.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.social-links a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  transition: var(--transition);
  font-size: 18px;
}

footer {
  background: var(--color5);
  color: white;
  padding: 60px 0 30px;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-bottom: 40px;
}

.footer-col h3 {
  font-size: 20px;
  margin-bottom: 25px;
  position: relative;
  padding-bottom: 10px;
}

.footer-col h3::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 2px;
  background: var(--color3);
}

.footer-links {
  list-style: none;
}

.footer-links li {
  margin-bottom: 12px;
}

.footer-links a {
  color: var(--color2);
  text-decoration: none;
  transition: var(--transition);
}

.footer-links a:hover {
  color: white;
  padding-left: 5px;
}

.social-links {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}

.social-links a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  transition: var(--transition);
}

.social-links a:hover {
  background: var(--color3);
  color: var(--color5);
  transform: translateY(-5px);
}

.newsletter input {
  width: 100%;
  padding: 12px 15px;
  border: none;
  border-radius: 5px;
  margin-bottom: 15px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.newsletter input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.copyright {
  text-align: center;
  padding-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 16px;
  color: var(--color2);
}
</style>
