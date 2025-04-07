document.addEventListener("DOMContentLoaded", function () {
    // 工具切换
    const toolList = document.querySelectorAll(".tool-list li");
    const toolContents = document.querySelectorAll(".tool-content");

    // 添加工具切换动画
    toolList.forEach((tool) => {
        tool.addEventListener("click", () => {
            const toolId = tool.getAttribute("data-tool");

            // 如果已经是激活状态，则不做任何操作
            if (tool.classList.contains("active")) return;

            // 先移除所有激活状态
            toolList.forEach((t) => t.classList.remove("active"));

            // 添加激活状态到当前工具
            tool.classList.add("active");

            // 切换内容区域
            const currentActive = document.querySelector(
                ".tool-content.active"
            );
            if (currentActive) {
                currentActive.classList.add("fade-out");
                setTimeout(() => {
                    toolContents.forEach((c) => {
                        c.classList.remove("active", "fade-out");
                    });
                    document.getElementById(toolId).classList.add("active");
                }, 150);
            } else {
                toolContents.forEach((c) => c.classList.remove("active"));
                document.getElementById(toolId).classList.add("active");
            }
        });
    });

    // Base64 功能
    document.getElementById("base64Encode").addEventListener("click", () => {
        const input = document.getElementById("base64Input").value;
        document.getElementById("base64Output").value =
            Tools.base64Encode(input);
    });

    document.getElementById("base64Decode").addEventListener("click", () => {
        const input = document.getElementById("base64Input").value;
        document.getElementById("base64Output").value =
            Tools.base64Decode(input);
    });

    // URL 编码功能
    document.getElementById("urlEncode").addEventListener("click", () => {
        const input = document.getElementById("urlInput").value;
        document.getElementById("urlOutput").value = Tools.urlEncode(input);
    });

    document.getElementById("urlDecode").addEventListener("click", () => {
        const input = document.getElementById("urlInput").value;
        document.getElementById("urlOutput").value = Tools.urlDecode(input);
    });

    // 设置日期时间输入框的默认值为当前时间
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    document.getElementById(
        "dateInput"
    ).value = `${year}-${month}-${day}T${hours}:${minutes}`;

    // 时间戳转日期时间
    document.getElementById("timestamp2date").addEventListener("click", () => {
        const input = document.getElementById("timestampInput").value;
        document.getElementById("timestamp2dateOutput").innerText =
            Tools.timestamp2date(input);
    });

    // 日期时间转时间戳
    document.getElementById("date2timestamp").addEventListener("click", () => {
        const input = document.getElementById("dateInput").value;
        document.getElementById("date2timestampOutput").innerText =
            Tools.date2timestamp(input);
    });

    // 复制功能
    document.querySelectorAll(".copy-btn").forEach((btn) => {
        btn.addEventListener("click", async () => {
            const targetId = btn.getAttribute("data-target");
            const targetElement = document.getElementById(targetId);
            let text = "";

            if (targetElement.tagName.toLowerCase() === "textarea") {
                text = targetElement.value;
            } else {
                text = targetElement.innerText;
            }

            try {
                await navigator.clipboard.writeText(text);

                // 保存原始内容（包括图标）
                const originalHTML = btn.innerHTML;

                // 更新复制成功的视觉反馈
                btn.innerHTML = '<i class="fas fa-check"></i> 已复制';
                btn.classList.add("success", "copy-animation");

                // 添加浮动提示
                const tooltip = document.createElement("div");
                tooltip.className = "copy-tooltip";
                tooltip.textContent = "复制成功!";
                document.body.appendChild(tooltip);

                // 定位提示
                const btnRect = btn.getBoundingClientRect();
                tooltip.style.top = `${btnRect.top - 30}px`;
                tooltip.style.left = `${
                    btnRect.left + btnRect.width / 2 - tooltip.offsetWidth / 2
                }px`;

                // 显示提示
                setTimeout(() => {
                    tooltip.classList.add("show");
                }, 10);

                // 恢复原始状态并移除提示
                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    btn.classList.remove("success", "copy-animation");
                    tooltip.classList.remove("show");
                    setTimeout(() => {
                        document.body.removeChild(tooltip);
                    }, 300);
                }, 1500);
            } catch (err) {
                console.error("复制失败:", err);
            }
        });
    });

    // JSON 格式化功能
    document.getElementById("jsonFormat").addEventListener("click", () => {
        const input = document.getElementById("jsonInput").value;
        document.getElementById("jsonOutput").value = Tools.jsonFormat(input);
    });

    document.getElementById("jsonMinify").addEventListener("click", () => {
        const input = document.getElementById("jsonInput").value;
        document.getElementById("jsonOutput").value = Tools.jsonMinify(input);
    });

    // JSON Diff 功能
    document.getElementById("compareDiff").addEventListener("click", () => {
        const oldJson = document.getElementById("jsonOldInput").value;
        const newJson = document.getElementById("jsonNewInput").value;
        document.getElementById("jsonDiffOutput").innerHTML = Tools.jsonDiff(
            oldJson,
            newJson
        );
    });

    // JSON 字符串转换功能
    document.getElementById("string2json").addEventListener("click", () => {
        const input = document.getElementById("stringInput").value;
        document.getElementById("string2jsonOutput").value =
            Tools.string2json(input);
    });

    document.getElementById("json2string").addEventListener("click", () => {
        const input = document.getElementById("jsonStringInput").value;
        document.getElementById("json2stringOutput").value =
            Tools.json2string(input);
    });
});
