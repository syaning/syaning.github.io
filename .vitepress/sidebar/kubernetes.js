import { loadItems } from './helper'

export default {
  '/notes/kubernetes/': [{
    text: 'Resources',
    items: [{
      text: '集群信息',
      items: loadItems([
        '/notes/kubernetes/resources/node',
        '/notes/kubernetes/resources/namespace',
        '/notes/kubernetes/resources/component-status',
        '/notes/kubernetes/resources/event',
      ])
    }, {
      text: 'Controller',
      items: loadItems([
        '/notes/kubernetes/resources/replica-set',
        '/notes/kubernetes/resources/deployment',
        '/notes/kubernetes/resources/stateful-set',
        '/notes/kubernetes/resources/daemon-set',
      ])
    }, {
      text: 'Pod',
      items: loadItems([
        '/notes/kubernetes/resources/pod',
        '/notes/kubernetes/resources/horizontal-pod-autoscaler',
      ])
    }, {
      text: '服务',
      items: loadItems([
        '/notes/kubernetes/resources/service',
        '/notes/kubernetes/resources/endpoints',
        '/notes/kubernetes/resources/ingress',
      ])
    }, {
      text: '配置',
      items: loadItems([
        '/notes/kubernetes/resources/configmap',
        '/notes/kubernetes/resources/secret',
      ])
    }, {
      text: '存储',
      items: loadItems([
        '/notes/kubernetes/resources/persistent-volume',
        '/notes/kubernetes/resources/persistent-volume-claim',
        '/notes/kubernetes/resources/storage-class',
      ])
    }, {
      text: '作业',
      items: loadItems([
        '/notes/kubernetes/resources/job',
        '/notes/kubernetes/resources/cronjob',
      ])
    }, {
      text: '资源管理',
      items: loadItems([
        '/notes/kubernetes/resources/resource-quota',
        '/notes/kubernetes/resources/pod-disruption-budget',
      ])
    }, {
      text: '权限管理',
      items: loadItems([
        '/notes/kubernetes/resources/service-account',
        '/notes/kubernetes/resources/role',
        '/notes/kubernetes/resources/cluster-role',
        '/notes/kubernetes/resources/role-binding',
        '/notes/kubernetes/resources/cluster-role-binding',
      ])
    }]
  }, {
    text: 'Guides',
    items: loadItems([
      '/notes/kubernetes/guides/components',
      '/notes/kubernetes/guides/api',
      '/notes/kubernetes/guides/pod-schedule',
      '/notes/kubernetes/guides/rbac',
      '/notes/kubernetes/guides/gpu',
    ])
  }]
}
