import { loadDirItems } from './helper'

export default {
  '/note/kubernetes/': [{
    text: 'Resources',
    collapsed: false,
    items: [{
      text: '集群信息',
      collapsed: true,
      items: loadDirItems('/note/kubernetes/resources', [
        'node',
        'namespace',
        'component-status',
        'event',
      ])
    }, {
      text: 'Controller',
      collapsed: true,
      items: loadDirItems('/note/kubernetes/resources', [
        'replica-set',
        'deployment',
        'stateful-set',
        'daemon-set',
      ])
    }, {
      text: 'Pod',
      collapsed: true,
      items: loadDirItems('/note/kubernetes/resources', [
        'pod',
        'horizontal-pod-autoscaler',
      ])
    }, {
      text: '服务',
      collapsed: true,
      items: loadDirItems('/note/kubernetes/resources', [
        'service',
        'endpoints',
        'ingress',
      ])
    }, {
      text: '配置',
      collapsed: true,
      items: loadDirItems('/note/kubernetes/resources', [
        'configmap',
        'secret',
      ])
    }, {
      text: '存储',
      collapsed: true,
      items: loadDirItems('/note/kubernetes/resources', [
        'persistent-volume',
        'persistent-volume-claim',
        'storage-class',
      ])
    }, {
      text: '作业',
      collapsed: true,
      items: loadDirItems('/note/kubernetes/resources', [
        'job',
        'cronjob',
      ])
    }, {
      text: '资源管理',
      collapsed: true,
      items: loadDirItems('/note/kubernetes/resources', [
        'resource-quota',
        'pod-disruption-budget',
      ])
    }, {
      text: '权限管理',
      collapsed: true,
      items: loadDirItems('/note/kubernetes/resources', [
        'service-account',
        'role',
        'cluster-role',
        'role-binding',
        'cluster-role-binding',
      ])
    }]
  }, {
    text: 'Guides',
    collapsed: false,
    items: loadDirItems('/note/kubernetes/guides', [
      'components',
      'api',
      'pod-schedule',
      'rbac',
      'gpu',
    ])
  }]
}
