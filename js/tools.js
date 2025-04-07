class Tools {
    static base64Encode(str) {
        return btoa(
            encodeURIComponent(str).replace(
                /%([0-9A-F]{2})/g,
                function toSolidBytes(match, p1) {
                    return String.fromCharCode("0x" + p1);
                }
            )
        );
    }

    static base64Decode(str) {
        try {
            return decodeURIComponent(
                atob(str)
                    .split("")
                    .map(function (c) {
                        return (
                            "%" +
                            ("00" + c.charCodeAt(0).toString(16)).slice(-2)
                        );
                    })
                    .join("")
            );
        } catch (e) {
            return "解码失败：输入不是有效的 Base64 字符串";
        }
    }

    static urlEncode(str) {
        return encodeURIComponent(str);
    }

    static urlDecode(str) {
        try {
            return decodeURIComponent(str);
        } catch (e) {
            return "解码失败：输入不是有效的 URL 编码字符串";
        }
    }

    static timestampConvert(input) {
        let result = "";

        // 尝试将输入解析为时间戳或日期时间
        if (/^\d+$/.test(input)) {
            // 输入是时间戳
            const date = new Date(parseInt(input));
            if (!isNaN(date.getTime())) {
                result = date.toLocaleString("zh-CN");
            }
        } else {
            // 输入是日期时间字符串
            const date = new Date(input);
            if (!isNaN(date.getTime())) {
                result = date.getTime().toString();
            }
        }

        return result || "无效的输入格式";
    }

    static timestamp2date(timestamp) {
        try {
            const date = new Date(parseInt(timestamp));
            if (isNaN(date.getTime())) {
                return "无效的时间戳";
            }
            return date.toLocaleString("zh-CN", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
            });
        } catch (e) {
            return "无效的时间戳";
        }
    }

    static date2timestamp(dateStr) {
        try {
            const date = new Date(dateStr);
            if (isNaN(date.getTime())) {
                return "无效的日期时间";
            }
            return date.getTime().toString();
        } catch (e) {
            return "无效的日期时间";
        }
    }

    static jsonFormat(str) {
        try {
            const obj = JSON.parse(str);
            return JSON.stringify(obj, null, 2);
        } catch (e) {
            return "无效的 JSON 格式：" + e.message;
        }
    }

    static jsonMinify(str) {
        try {
            const obj = JSON.parse(str);
            return JSON.stringify(obj);
        } catch (e) {
            return "无效的 JSON 格式：" + e.message;
        }
    }

    static jsonDiff(oldJson, newJson) {
        try {
            const oldObj = JSON.parse(oldJson);
            const newObj = JSON.parse(newJson);

            return this.generateDiff(oldObj, newObj);
        } catch (e) {
            return "无效的 JSON 格式：" + e.message;
        }
    }

    static generateDiff(oldObj, newObj, path = "") {
        let diff = "";

        // 获取所有键的集合
        const allKeys = new Set([
            ...Object.keys(oldObj || {}),
            ...Object.keys(newObj || {}),
        ]);

        for (const key of allKeys) {
            const currentPath = path ? `${path}.${key}` : key;
            const oldValue = oldObj?.[key];
            const newValue = newObj?.[key];

            if (!(key in oldObj)) {
                // 新增的属性
                diff += `<div class="diff-added">+ ${currentPath}: ${JSON.stringify(
                    newValue
                )}</div>`;
            } else if (!(key in newObj)) {
                // 删除的属性
                diff += `<div class="diff-removed">- ${currentPath}: ${JSON.stringify(
                    oldValue
                )}</div>`;
            } else if (typeof oldValue !== typeof newValue) {
                // 类型改变
                diff += `<div class="diff-removed">- ${currentPath}: ${JSON.stringify(
                    oldValue
                )}</div>`;
                diff += `<div class="diff-added">+ ${currentPath}: ${JSON.stringify(
                    newValue
                )}</div>`;
            } else if (typeof oldValue === "object" && oldValue !== null) {
                // 递归比较对象
                const nestedDiff = this.generateDiff(
                    oldValue,
                    newValue,
                    currentPath
                );
                if (nestedDiff) {
                    diff += nestedDiff;
                }
            } else if (oldValue !== newValue) {
                // 值改变
                diff += `<div class="diff-removed">- ${currentPath}: ${JSON.stringify(
                    oldValue
                )}</div>`;
                diff += `<div class="diff-added">+ ${currentPath}: ${JSON.stringify(
                    newValue
                )}</div>`;
            } else {
                // 未改变
                diff += `<div class="diff-unchanged">  ${currentPath}: ${JSON.stringify(
                    oldValue
                )}</div>`;
            }
        }

        return diff;
    }

    static string2json(str) {
        try {
            // 尝试直接解析
            try {
                const obj = JSON.parse(str);
                return JSON.stringify(obj, null, 2);
            } catch {
                // 如果直接解析失败，尝试处理转义字符
                const processedStr = str
                    .replace(/\\/g, "") // 移除反斜杠
                    .replace(/^"/, "") // 移除开头的引号
                    .replace(/"$/, ""); // 移除结尾的引号
                const obj = JSON.parse(processedStr);
                return JSON.stringify(obj, null, 2);
            }
        } catch (e) {
            return "无效的 JSON 字符串：" + e.message;
        }
    }

    static json2string(json) {
        try {
            // 首先验证输入是否是有效的 JSON
            const obj = JSON.parse(json);
            // 将 JSON 转换为字符串并进行转义
            return JSON.stringify(obj);
        } catch (e) {
            return "无效的 JSON 格式：" + e.message;
        }
    }
}
