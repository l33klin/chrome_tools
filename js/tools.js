class Tools {
  static base64Encode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
      function toSolidBytes(match, p1) {
        return String.fromCharCode('0x' + p1);
    }));
  }

  static base64Decode(str) {
    try {
      return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
    } catch (e) {
      return '解码失败：输入不是有效的 Base64 字符串';
    }
  }

  static urlEncode(str) {
    return encodeURIComponent(str);
  }

  static urlDecode(str) {
    try {
      return decodeURIComponent(str);
    } catch (e) {
      return '解码失败：输入不是有效的 URL 编码字符串';
    }
  }

  static timestampConvert(input) {
    let result = '';
    
    // 尝试将输入解析为时间戳或日期时间
    if (/^\d+$/.test(input)) {
      // 输入是时间戳
      const date = new Date(parseInt(input));
      if (!isNaN(date.getTime())) {
        result = date.toLocaleString('zh-CN');
      }
    } else {
      // 输入是日期时间字符串
      const date = new Date(input);
      if (!isNaN(date.getTime())) {
        result = date.getTime().toString();
      }
    }

    return result || '无效的输入格式';
  }

  static timestamp2date(timestamp) {
    try {
        const date = new Date(parseInt(timestamp));
        if (isNaN(date.getTime())) {
            return '无效的时间戳';
        }
        return date.toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
    } catch (e) {
        return '无效的时间戳';
    }
  }

  static date2timestamp(dateStr) {
    try {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) {
            return '无效的日期时间';
        }
        return date.getTime().toString();
    } catch (e) {
        return '无效的日期时间';
    }
  }
} 