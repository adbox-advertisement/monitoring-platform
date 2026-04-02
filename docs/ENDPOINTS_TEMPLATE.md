# Endpoint Specification Template

Use this file as the source of truth while defining the backend contract for this project.

Fill in every section for:
- HTTP endpoints
- WebSocket or Socket.IO connections
- server-emitted events
- client-emitted events

If a section does not apply, write `N/A` instead of leaving it blank.

---

## Service Overview

### Base URLs

- HTTP base URL:
- Socket base URL:
- Environment(s):

### Ownership

- Service name:
- Team or owner:
- Primary contact:

### Auth Summary

- Auth type:
- Token format:
- Refresh flow:
- Socket auth handshake:

---

## Naming Rules

- Use plural nouns for collections where possible.
- Keep paths lowercase and kebab-case.
- Version public APIs explicitly, for example `/api/v1/...`.
- For socket events, use namespaced event names, for example `job.updated` or `notification.sent`.
- Document whether IDs are UUIDs, numeric IDs, ULIDs, or custom strings.

---

## HTTP Endpoints

Copy this block for each endpoint.

```md
### [METHOD] /api/v1/<resource-path>

#### Summary
- Purpose:
- Consumer:
- Auth required: Yes / No
- Roles allowed:

#### Request
- Method:
- Full path:
- Query params:
  - `name`:
    - type:
    - required:
    - example:
    - notes:
- Path params:
  - `id`:
    - type:
    - required:
    - example:
    - notes:
- Headers:
  - `Authorization`:
    - required:
    - format:
  - `Content-Type`:
    - required:
    - value:
- Body schema:

```json
{
  "example": "replace-me"
}
```

#### Validation Rules
- Required fields:
- Field constraints:
- Allowed values:
- Idempotent: Yes / No

#### Success Response
- Status code:
- Response schema:

```json
{
  "example": "replace-me"
}
```

#### Error Responses
- `400`:
- `401`:
- `403`:
- `404`:
- `409`:
- `422`:
- `500`:

#### Side Effects
- Database writes:
- Queue writes:
- Cache changes:
- External service calls:

#### Notes
- Rate limit:
- Timeout:
- Pagination:
- Sorting:
- Filtering:
- Deprecation notes:
```

---

## Socket Connection Contract

Fill this once per socket namespace or channel.

```md
### Socket Namespace: `<namespace-or-channel>`

#### Summary
- Purpose:
- Transport:
- Auth required: Yes / No
- Reconnect strategy:

#### Connection
- URL:
- Namespace:
- Auth payload:

```json
{
  "token": "replace-me"
}
```

#### Connection Lifecycle
- On connect:
- On disconnect:
- Heartbeat or ping interval:
- Server timeout behavior:
- Client retry behavior:

#### Rooms / Topics / Subscriptions
- Supported rooms:
- Subscription rules:
- Unsubscribe rules:
```

---

## Client -> Server Socket Events

Copy this block for each client-emitted event.

```md
### Event: `<event.name>`

#### Summary
- Purpose:
- Auth required: Yes / No
- Ack expected: Yes / No

#### Payload

```json
{
  "example": "replace-me"
}
```

#### Validation Rules
- Required fields:
- Allowed values:
- Size limits:

#### Ack Response

```json
{
  "success": true,
  "message": "replace-me"
}
```

#### Error Cases
- `UNAUTHORIZED`:
- `INVALID_PAYLOAD`:
- `FORBIDDEN`:
- `NOT_FOUND`:
- `RATE_LIMITED`:
```

---

## Server -> Client Socket Events

Copy this block for each server-emitted event.

```md
### Event: `<event.name>`

#### Summary
- Purpose:
- Sent to:
- Triggered by:

#### Payload

```json
{
  "example": "replace-me"
}
```

#### Delivery Rules
- Broadcast / room / direct:
- Ordering guarantee:
- Retry behavior:
- Can duplicates happen: Yes / No

#### Consumer Notes
- UI action:
- State update:
- Error handling:
```

---

## Error Format Standard

Use one error shape across HTTP and sockets whenever possible.

```json
{
  "error": {
    "code": "INVALID_PAYLOAD",
    "message": "Human-readable explanation",
    "details": {
      "field": "example"
    },
    "requestId": "req_123"
  }
}
```

### Error Code Inventory

- `UNAUTHORIZED`
- `FORBIDDEN`
- `NOT_FOUND`
- `INVALID_PAYLOAD`
- `VALIDATION_ERROR`
- `CONFLICT`
- `RATE_LIMITED`
- `INTERNAL_ERROR`

---

## Data Model Notes

- Primary entities:
- Shared enums:
- Timestamp format:
- Timezone rules:
- Nullable fields:
- Soft-delete behavior:

---

## Open Questions

- Question:
- Question:
- Question:

---

## Change Log

- `YYYY-MM-DD`: Created initial endpoint contract draft.

