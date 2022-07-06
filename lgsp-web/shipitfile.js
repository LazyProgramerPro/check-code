module.exports = shipit => {
  require('shipit-deploy')(shipit);

  shipit.initConfig({
    default: {
      dirToCopy: './build',
      deployTo: '/var/www/deployments/rangdong',
      repositoryUrl: 'git@gitlab.com:gioxoay/rangdong-hrm.git',
      ignores: ['.git', 'node_modules'],
      keepReleases: 2,
      shallowClone: true,
      branch: 'dev',
    },
    dev: {
      servers: [
        {
          host: 'rangdong.comartek.com',
          user: 'root',
        },
      ],
    },
    demo: {
      servers: [
        {
          host: '13.228.152.244',
          user: 'ubuntu',
        },
      ],
    },
  });

  shipit.blTask('deploy:init', () => {
    shipit.config.deployTo = `${shipit.config.deployTo}/${shipit.config.branch}`;
  });

  shipit.blTask('deploy:install', () => {
    return shipit.local(`cd ${shipit.workspace} && yarn install`);
  });

  shipit.blTask('deploy:build', () => {
    return shipit.local(`cd ${shipit.workspace} && yarn build`);
  });

  shipit.task('deploy', [
    'deploy:init',
    'deploy:fetch',
    'deploy:install',
    // 'deploy:copy',
    'deploy:build',
    'deploy:update',
    'deploy:publish',
  ]);

  shipit.task('rollback', ['rollback:init', 'deploy:publish', 'deploy:clean', 'deploy:finish', 'deploy:serve']);
};
