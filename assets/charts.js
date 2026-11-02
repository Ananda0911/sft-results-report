(function() {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();

  function init(id) {
    return echarts.init(document.getElementById(id), null, { renderer: 'svg' });
  }

  // --- Chart 1: 清洗漏斗 ---
  var funnel = init('chart-funnel');
  funnel.setOption({
    animation: false,
    tooltip: { trigger: 'item', appendToBody: true, formatter: '{b}: {c} 条' },
    color: [accent, accent + 'cc', accent2, accent2 + '99'],
    series: [{
      type: 'funnel',
      left: '10%', width: '80%',
      sort: 'descending',
      gap: 3,
      label: { color: '#fff', fontSize: 13, formatter: '{b}\n{c} 条' },
      itemStyle: { borderColor: bg2, borderWidth: 1 },
      data: [
        { value: 792099, name: '原始数据（6 科室 CSV）' },
        { value: 693506, name: '规则过滤后' },
        { value: 605784, name: 'MD5 去重后' },
        { value: 1200, name: '均衡采样（每科室 200）' }
      ]
    }]
  });

  // --- Chart 2: 科室分布 ---
  var dept = init('chart-dept');
  dept.setOption({
    animation: false,
    tooltip: { trigger: 'axis', appendToBody: true, formatter: '{b}: {c} 条' },
    grid: { left: 50, right: 30, top: 20, bottom: 40 },
    xAxis: {
      type: 'category',
      data: ['内科', '妇产科', '外科', '儿科', '男科', '肿瘤科'],
      axisLabel: { color: ink },
      axisLine: { lineStyle: { color: rule } },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: muted },
      splitLine: { lineStyle: { color: rule } }
    },
    series: [{
      type: 'bar',
      barWidth: '52%',
      data: [220606, 183751, 115991, 101602, 94596, 75553],
      itemStyle: { color: accent, borderRadius: [4, 4, 0, 0] },
      label: { show: true, position: 'top', color: muted, fontSize: 11 }
    }]
  });

  // --- Chart 3: 质量雷达 ---
  var radar = init('chart-radar');
  radar.setOption({
    animation: false,
    tooltip: { appendToBody: true },
    legend: { bottom: 0, textStyle: { color: muted }, data: ['清洗前', '清洗后'] },
    color: [muted, accent2],
    radar: {
      indicator: [
        { name: '格式合规 (20)', max: 20 },
        { name: '字段完整 (20)', max: 20 },
        { name: '语言一致 (15)', max: 15 },
        { name: '数据唯一 (15)', max: 15 },
        { name: '长度合理 (15)', max: 15 },
        { name: '多样性 (15)', max: 15 }
      ],
      radius: '62%',
      axisName: { color: ink, fontSize: 12 },
      splitLine: { lineStyle: { color: rule } },
      splitArea: { areaStyle: { color: [bg2, '#f0f4fa'] } },
      axisLine: { lineStyle: { color: rule } }
    },
    series: [{
      type: 'radar',
      data: [
        { value: [20, 20, 15, 14.7, 15, 15], name: '清洗前', areaStyle: { opacity: 0.15 } },
        { value: [20, 20, 15, 15, 14.9, 15], name: '清洗后', areaStyle: { opacity: 0.2 } }
      ]
    }]
  });

  // --- Chart 4: BLEU 对比 ---
  var bleu = init('chart-bleu');
  bleu.setOption({
    animation: false,
    tooltip: { trigger: 'axis', appendToBody: true },
    legend: { bottom: 0, textStyle: { color: muted }, data: ['微调前', '微调后'] },
    color: [muted, accent2],
    grid: { left: 60, right: 30, top: 30, bottom: 60 },
    xAxis: {
      type: 'category',
      data: ['头晕怎么办', '感冒发烧吃什么药', '高血压注意事项', '平均'],
      axisLabel: { color: ink },
      axisLine: { lineStyle: { color: rule } },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      name: 'BLEU',
      nameTextStyle: { color: muted },
      axisLabel: { color: muted },
      splitLine: { lineStyle: { color: rule } }
    },
    series: [
      { name: '微调前', type: 'bar', barWidth: '30%', data: [0.0320, 0.0281, 0.0316, 0.0306], itemStyle: { borderRadius: [3, 3, 0, 0] } },
      { name: '微调后', type: 'bar', barWidth: '30%', data: [0.0626, 0.0871, 0.0585, 0.0694], itemStyle: { borderRadius: [3, 3, 0, 0] } }
    ]
  });

  // --- Chart 5: Loss 曲线对比 ---
  var loss = init('chart-loss');
  var rawLoss = [5.0215, 4.7907, 4.2995, 4.5693, 4.6431, 4.1559, 4.2324, 3.7583, 3.5715, 3.8085, 4.3201, 4.0619, 3.6206, 3.7849, 3.8119, 4.0087, 3.6742, 3.4995, 3.7731, 3.4512, 3.6997, 3.8172, 3.8754, 3.7135, 4.1255, 3.8753, 3.7040, 3.5755, 3.4327, 3.5359];
  var cleanLoss = [4.9379, 4.6519, 4.5025, 4.4585, 4.4840, 4.1256, 4.3080, 3.7770, 3.4243, 3.8608, 4.1125, 3.9477, 3.6831, 3.7057, 3.7334, 3.9263, 3.7505, 3.7959, 3.8225, 3.3901, 3.8672, 3.8485, 3.8675, 3.6631, 4.0951, 3.9081, 3.5220, 3.8258, 3.5400, 3.5357];
  var steps = [];
  for (var i = 1; i <= 30; i++) steps.push(String(i));
  loss.setOption({
    animation: false,
    tooltip: { trigger: 'axis', appendToBody: true },
    legend: { bottom: 0, textStyle: { color: muted }, data: ['原始数据', '清洗后数据'] },
    color: [muted, accent2],
    grid: { left: 50, right: 30, top: 30, bottom: 60 },
    xAxis: {
      type: 'category',
      data: steps,
      name: '步数',
      nameLocation: 'middle',
      nameGap: 28,
      nameTextStyle: { color: muted },
      axisLabel: { color: muted },
      axisLine: { lineStyle: { color: rule } },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      min: 3.2,
      name: 'Loss',
      nameTextStyle: { color: muted },
      axisLabel: { color: muted },
      splitLine: { lineStyle: { color: rule } }
    },
    series: [
      {
        name: '原始数据', type: 'line', data: rawLoss, smooth: true,
        symbol: 'none', lineStyle: { width: 2, type: 'dashed' }
      },
      {
        name: '清洗后数据', type: 'line', data: cleanLoss, smooth: true,
        symbol: 'none', lineStyle: { width: 2.5 }
      }
    ]
  });

  window.addEventListener('resize', function() {
    funnel.resize(); dept.resize(); radar.resize(); bleu.resize(); loss.resize();
  });
})();
