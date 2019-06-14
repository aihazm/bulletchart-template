export default function picassoDefinition({
  layout,
}) {
  const box = function ({
    start,
    end,
    width,
    fill,
    minHeightPx
  }) {
    const b = {
      key: 'bars',
      type: 'box',
      data: {
        extract: {
          field: 'qDimensionInfo/0',
          props: {
            start,
            end
          }
        }
      },
      settings: {
        orientation: 'horizontal',
        major: { scale: 'y' },
        minor: { scale: 'v' },
        box: {
          width,
          fill,
          minHeightPx
        }
      }
    };

    return b;
  }
  if (!layout.qHyperCube) {
    throw new Error('Layout is missing a hypercube');
  }
  return {
    collections: [{
      key: 'd',
      data: {
        extract: {
          field: 'qDimensionInfo/0',
          props: {
            start: { field: 'qMeasureInfo/0' },
            end: { field: 'qMeasureInfo/1' }
          }
        }
      }
    }],
    scales: {
      y: {
        data: { extract: { field: 'qDimensionInfo/0' } },
        padding: 0.2
      },
      v: {
        data: { fields: ['qMeasureInfo/0', 'qMeasureInfo/1'] },
        expand: 0.1,
        min: 0,
        max: 100
      }
    },
    components: [{
      type: 'axis',
      dock: 'left',
      scale: 'y'
    }, {
      type: 'axis',
      dock: 'bottom',
      scale: 'v'
    },
    box({ start: 0, end: 1000, width: 0.8, fill: '#eee' }),
    box({ start: 0, end: { field: 'qMeasureInfo/1', value: v => v * 0.8 }, width: 0.8, fill: '#ccc' }),
    box({ start: 0, end: { field: 'qMeasureInfo/1', value: v => v * 0.6 }, width: 0.8, fill: '#aaa' }),
    box({ start: 0, end: { field: 'qMeasureInfo/0' }, width: 0.4, fill: '#111' }),
    box({ start: { field: 'qMeasureInfo/1' }, end: { field: 'qMeasureInfo/1' }, width: 0.7, fill: '#111', minHeightPx: 3 })
    ],
  };
}
