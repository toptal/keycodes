# Services Healthcheck

A boilerplate healthcheck endpoint is in place at `pages/api/healthcheck.ts` and can be accessible at `/api/healthcheck`. The response format follows [requirements documentation](https://toptal-core.atlassian.net/wiki/spaces/IE/pages/1387036851/)

Each project has its own set of services. During the setup and whenever a new service is added as a dependency, make sure to add it to the `services` list at `pages/api/healthcheck.ts`.
It's an array of objects of the type `CheckerType` (defined at `~/lib/types/healthcheck`), which must have the following structure:

```javascript
{
  name: string
  critical: boolean
  check: () => Promise<unknown>
}
```

- **name** The name of the service
- **critical** Whether the service is a critical one or not
  - Whenever a critical service is `DOWN`, `service_status` is also `DOWN`
  - Whenever a non-critical service is `DOWN`, `service_status` is `DEGRADED`
- **check** An async function that must throw an error if the service it's responsible to validate is not working. Any returned value will be added to the `data` entry on the api response.

Make sure to add redirect check for the project. There's a utility function to help with that at `~/lib/healthcheck/checkers/redirect` that can be used inside a `check` function.
