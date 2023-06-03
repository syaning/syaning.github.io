import { loadAllFiles, filters, sorters, clusters } from './helper'

const loadK8sItems = (dir, arr) => loadAllFiles(`/notes/kubernetes/${dir}`, {
  files: arr.map(f => `${f}.md`)
})

export default {
  '/posts/': loadAllFiles('/posts', {
    filter: filters.allMdButIndex,
    sorter: sorters.byDateDesc,
    cluster: clusters.byYear,
  }),

  '/shells/': loadAllFiles('/shells', {
    filter: filters.allMdButIndex,
    sorter: sorters.byDateDesc,
    cluster: clusters.byYear,
  }),

  '/notes/leetcode/': [{
    text: 'Leetcode',
    items: loadAllFiles('/notes/leetcode', {
      filter: filters.allMdButIndex,
      sorter: sorters.byFilenameIndex,
    })
  }],

  '/notes/kubernetes/': [{
    text: 'Resources',
    collapsed: false,
    items: [{
      text: '集群信息',
      collapsed: true,
      items: loadK8sItems('resources', ['node', 'namespace', 'component-status', 'event'])
    }, {
      text: 'Controller',
      collapsed: true,
      items: loadK8sItems('resources', ['replica-set', 'deployment', 'stateful-set', 'daemon-set'])
    }, {
      text: 'Pod',
      collapsed: true,
      items: loadK8sItems('resources', ['pod', 'horizontal-pod-autoscaler'])
    }, {
      text: '服务',
      collapsed: true,
      items: loadK8sItems('resources', ['service', 'endpoints', 'ingress'])
    }, {
      text: '配置',
      collapsed: true,
      items: loadK8sItems('resources', ['configmap', 'secret'])
    }, {
      text: '存储',
      collapsed: true,
      items: loadK8sItems('resources', ['persistent-volume', 'persistent-volume-claim', 'storage-class'])
    }, {
      text: '作业',
      collapsed: true,
      items: loadK8sItems('resources', ['job', 'cronjob'])
    }, {
      text: '资源管理',
      collapsed: true,
      items: loadK8sItems('resources', ['resource-quota', 'pod-disruption-budget'])
    }, {
      text: '权限管理',
      collapsed: true,
      items: loadK8sItems('resources', ['service-account', 'role', 'cluster-role', 'role-binding', 'cluster-role-binding'])
    }]
  }, {
    text: 'Guides',
    collapsed: false,
    items: loadK8sItems('guides', ['components', 'api', 'pod-schedule', 'rbac', 'gpu'])
  }],
}
