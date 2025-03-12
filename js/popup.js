document.addEventListener('DOMContentLoaded', function() {
  // 工具切换
  const toolList = document.querySelectorAll('.tool-list li');
  const toolContents = document.querySelectorAll('.tool-content');

  toolList.forEach(tool => {
    tool.addEventListener('click', () => {
      const toolId = tool.getAttribute('data-tool');
      
      toolList.forEach(t => t.classList.remove('active'));
      toolContents.forEach(c => c.classList.remove('active'));
      
      tool.classList.add('active');
      document.getElementById(toolId).classList.add('active');
    });
  });

  // Base64 功能
  document.getElementById('base64Encode').addEventListener('click', () => {
    const input = document.getElementById('base64Input').value;
    document.getElementById('base64Output').value = Tools.base64Encode(input);
  });

  document.getElementById('base64Decode').addEventListener('click', () => {
    const input = document.getElementById('base64Input').value;
    document.getElementById('base64Output').value = Tools.base64Decode(input);
  });

  // URL 编码功能
  document.getElementById('urlEncode').addEventListener('click', () => {
    const input = document.getElementById('urlInput').value;
    document.getElementById('urlOutput').value = Tools.urlEncode(input);
  });

  document.getElementById('urlDecode').addEventListener('click', () => {
    const input = document.getElementById('urlInput').value;
    document.getElementById('urlOutput').value = Tools.urlDecode(input);
  });

  // 设置日期时间输入框的默认值为当前时间
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  document.getElementById('dateInput').value = `${year}-${month}-${day}T${hours}:${minutes}`;

  // 时间戳转日期时间
  document.getElementById('timestamp2date').addEventListener('click', () => {
    const input = document.getElementById('timestampInput').value;
    document.getElementById('timestamp2dateOutput').innerText = Tools.timestamp2date(input);
  });

  // 日期时间转时间戳
  document.getElementById('date2timestamp').addEventListener('click', () => {
    const input = document.getElementById('dateInput').value;
    document.getElementById('date2timestampOutput').innerText = Tools.date2timestamp(input);
  });

  // 复制功能
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const targetId = btn.getAttribute('data-target');
      const targetElement = document.getElementById(targetId);
      let text = '';
      
      if (targetElement.tagName.toLowerCase() === 'textarea') {
        text = targetElement.value;
      } else {
        text = targetElement.innerText;
      }

      try {
        await navigator.clipboard.writeText(text);
        
        // 显示复制成功的视觉反馈
        const originalText = btn.textContent;
        btn.textContent = '已复制';
        btn.classList.add('success', 'copy-animation');
        
        setTimeout(() => {
          btn.textContent = originalText;
          btn.classList.remove('success', 'copy-animation');
        }, 1000);
      } catch (err) {
        console.error('复制失败:', err);
      }
    });
  });
}); 