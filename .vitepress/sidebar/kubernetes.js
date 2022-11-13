import { loadItems } from './helper'

export default {
  '/learn/kubernetes/': [{
    text: 'Resources',
    items: [{
      text: '集群信息',
      items: loadItems([
        '/learn/kubernetes/resources/node',
        '/learn/kubernetes/resources/namespace',
        '/learn/kubernetes/resources/component-status',
        '/learn/kubernetes/resources/event',
      ])
    }, {
      text: 'Controller',
      items: loadItems([
        '/learn/kubernetes/resources/replica-set',
        '/learn/kubernetes/resources/deployment',
        '/learn/kubernetes/resources/stateful-set',
        '/learn/kubernetes/resources/daemon-set',
      ])
    }, {
      text: 'Pod',
      items: loadItems([
        '/learn/kubernetes/resources/pod',
        '/learn/kubernetes/resources/horizontal-pod-autoscaler',
      ])
    }, {
      text: '服务',
      items: loadItems([
        '/learn/kubernetes/resources/service',
        '/learn/kubernetes/resources/endpoints',
        '/learn/kubernetes/resources/ingress',
      ])
    }, {
      text: '配置',
      items: loadItems([
        '/learn/kubernetes/resources/configmap',
        '/learn/kubernetes/resources/secret',
      ])
    }, {
      text: '存储',
      items: loadItems([
        '/learn/kubernetes/resources/persistent-volume',
        '/learn/kubernetes/resources/persistent-volume-claim',
        '/learn/kubernetes/resources/storage-class',
      ])
    }, {
      text: '作业',
      items: loadItems([
        '/learn/kubernetes/resources/job',
        '/learn/kubernetes/resources/cronjob',
      ])
    }, {
      text: '资源管理',
      items: loadItems([
        '/learn/kubernetes/resources/resource-quota',
        '/learn/kubernetes/resources/pod-disruption-budget',
      ])
    }, {
      text: '权限管理',
      items: loadItems([
        '/learn/kubernetes/resources/service-account',
        '/learn/kubernetes/resources/role',
        '/learn/kubernetes/resources/cluster-role',
        '/learn/kubernetes/resources/role-binding',
        '/learn/kubernetes/resources/cluster-role-binding',
      ])
    }]
  }, {
    text: 'Guides',
    items: loadItems([
      '/learn/kubernetes/guides/components',
      '/learn/kubernetes/guides/api',
      '/learn/kubernetes/guides/pod-schedule',
      '/learn/kubernetes/guides/rbac',
      '/learn/kubernetes/guides/gpu',
    ])
  }]
}
