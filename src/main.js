import './style.css'

document.querySelector('#app').innerHTML = `
  <div class="container">
    <div class="profile-card">
      <div class="profile-header">
        <div class="avatar">
          <span class="avatar-text">홍</span>
        </div>
        <h1 class="name">홍길동</h1>
        <p class="title">AI융합교육 전문가</p>
      </div>
      
      <div class="profile-content">
        <section class="info-section">
          <h2>소개</h2>
          <p class="description">
            AI메이커 관련 다양한 활동을 통해 창의적이고 혁신적인 교육을 실천하고 있습니다.
          </p>
        </section>
        
        <section class="info-section">
          <h2>활동</h2>
          <div class="activity-list">
            <div class="activity-item">
              <div class="activity-icon">🎓</div>
              <div class="activity-content">
                <h3>AI메이커반 동아리 담당교사</h3>
                <p>학생들과 함께 AI와 메이커 활동을 통해 미래 역량을 기르고 있습니다.</p>
              </div>
            </div>
            <div class="activity-item">
              <div class="activity-icon">🤖</div>
              <div class="activity-content">
                <h3>AI메이커 활동</h3>
                <p>다양한 AI메이커 프로젝트와 교육 프로그램을 기획하고 운영하고 있습니다.</p>
              </div>
            </div>
            <div class="activity-item">
              <div class="activity-icon">📚</div>
              <div class="activity-content">
                <h3>AI융합교육 전공</h3>
                <p>AI와 교육의 융합을 통해 새로운 교육 패러다임을 만들어가고 있습니다.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
`
