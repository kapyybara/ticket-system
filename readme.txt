
For test cicd environment: 
commands

FRONTEND: 
    export BUILD_ENV=dev && 
    export GITLAB_REGISTRY_USERNAME=ink_vytdp &&
    export GITLAB_REGISTRY_PASSWORD=123Phuongvy && 
    export CI_REGISTRY_IMAGE=registry.gitlab.com/inter-k/internal/ias-v2 &&
    export CI_JOB_NAME=deploy:services/web-client &&
    export CI_COMMIT_SHA=test &&
    export WORKSPACE_FOLDER=services/web-client &&
    export DIGITALOCEAN_TOKEN=12345 &&
    export GITLAB_REGISTRY_USER=a &&
    export GITLAB_REGISTRY_PASSWORD=1234

BACKEND: 
 export BUILD_ENV=dev && 
    export GITLAB_REGISTRY_USERNAME=ink_vytdp &&
    export GITLAB_REGISTRY_PASSWORD=123Phuongvy && 
    export CI_REGISTRY_IMAGE=ias-backend &&
    export CI_JOB_NAME=deploy:services/server &&
    export CI_COMMIT_SHA=test
    export WORKSPACE_FOLDER=backend


HASURA:
 export BUILD_ENV=dev && 
    export GITLAB_REGISTRY_USERNAME=ink_vytdp &&
    export GITLAB_REGISTRY_PASSWORD=123Phuongvy && 
    export CI_JOB_NAME=deploy:services/hasura &&
    export CI_COMMIT_SHA=test &&
    export WORKSPACE_FOLDER=hasura  &&
    export HASURA_GRAPHQL_DATABASE_URL=postgres://admin:ithanv2password@ink-ithanv2-db:5432/ithanv2_db  && 
    export HASURA_GRAPHQL_ADMIN_SECRET=myadminsecret  &&
    export ACTION_BASE_URL=http://back-end:4000 &&
    export CI_REGISTRY_IMAGE=""


DOCUMENTS:
 export BUILD_ENV=dev && 
    export CI_REGISTRY_IMAGE=gitlab.inter-k.com:5050/inter-k/internal-software/ithanv2 &&
    export CI_JOB_NAME=infra_deploy &&
    export CI_COMMIT_SHA=1f5618a8c16e3b692e857d0e16f5e3da6debb788
    export WORKSPACE_FOLDER=documents
    export DB_PORT=25060