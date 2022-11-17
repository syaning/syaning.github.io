import { loadDirItems } from './helper'

export default {
  '/notes/kubernetes/': [{
    text: 'Resources',
    collapsible: true,
    items: [{
      text: '集群信息',
      items: loadDirItems('/notes/kubernetes/resources', [
        'node',
        'namespace',
        'component-status',
        'event',
      ])
    }, {
      text: 'Controller',
      items: loadDirItems('/notes/kubernetes/resources', [
        'replica-set',
        'deployment',
        'stateful-set',
        'daemon-set',
      ])
    }, {
      text: 'Pod',
      items: loadDirItems('/notes/kubernetes/resources', [
        'pod',
        'horizontal-pod-autoscaler',
      ])
    }, {
      text: '服务',
      items: loadDirItems('/notes/kubernetes/resources', [
        'service',
        'endpoints',
        'ingress',
      ])
    }, {
      text: '配置',
      items: loadDirItems('/notes/kubernetes/resources', [
        'configmap',
        'secret',
      ])
    }, {
      text: '存储',
      items: loadDirItems('/notes/kubernetes/resources', [
        'persistent-volume',
        'persistent-volume-claim',
        'storage-class',
      ])
    }, {
      text: '作业',
      items: loadDirItems('/notes/kubernetes/resources', [
        'job',
        'cronjob',
      ])
    }, {
      text: '资源管理',
      items: loadDirItems('/notes/kubernetes/resources', [
        'resource-quota',
        'pod-disruption-budget',
      ])
    }, {
      text: '权限管理',
      items: loadDirItems('/notes/kubernetes/resources', [
        'service-account',
        'role',
        'cluster-role',
        'role-binding',
        'cluster-role-binding',
      ])
    }]
  }, {
    text: 'Guides',
    collapsible: true,
    items: loadDirItems('/notes/kubernetes/guides', [
      'components',
      'api',
      'pod-schedule',
      'rbac',
      'gpu',
    ])
  }]
}
