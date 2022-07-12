# Deployment & Sandbox

## Kubernetes Docs

https://k8s.toptal.rocks

### Configuring your own app

To configure your application change `NAME` and `NAMESPACE` on `.sandbox.env`.
Also change the `host` in `.values.yaml` as needed.

### Deploy on Toptal K8s Sandbox

#### Install sandbox

You need to have [the sandbox script installed](https://toptal-core.atlassian.net/wiki/spaces/SACQ/pages/2278949233/Onboarding+guide+WIP#Level-2---The-Process-%F0%9F%9A%80).

Go to [raw sandbox file](https://github.com/toptal/inf-toolbox/raw/master/bin/sandbox) and copy the resulting URL

```sh
curl [paste URL here] > sandbox
```

```sh
chmod u+x sandbox
```

You can find detailed instructions with an example in
this [Quickstart Guide](https://toptal-core.atlassian.net/wiki/spaces/IE/pages/1452310563)

#### Deploy using sandbox

Use the commands below:

```sh
./sandbox build
./sandbox push
./sandbox deploy
```

To setup `staging` and `production` you can
follow [this guide](https://toptal-core.atlassian.net/wiki/spaces/IE/pages/1858601150)
