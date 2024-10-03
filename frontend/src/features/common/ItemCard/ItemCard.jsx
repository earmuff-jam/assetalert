import { AlarmAddRounded, DeleteRounded, EditNoteRounded } from '@mui/icons-material';
import { Card, CardActions, CardContent, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { STATUS_OPTIONS } from '../../Notes/constants';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default function ItemCard({ data, handleEdit, handleDelete, prefixURI }) {
  const navigate = useNavigate();

  return (
    <Stack>
      <Stack spacing={{ xs: 1 }} direction="row" useFlexGap flexWrap="wrap">
        {data?.map((item, index) => (
          <Stack key={index} flexGrow={1}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '0.2rem',
                borderRight: '0.175rem solid',
                borderColor: item.color ? `${item.color}` : 'primary.main',
              }}
            >
              <CardContent>
                <Stack direction="row">
                  <Stack flexGrow={1} sx={{ minWidth: '20rem', minHeight: '6rem' }}>
                    <Typography
                      variant="h6"
                      component="h3"
                      onClick={() => navigate(encodeURI(`/${prefixURI}/${item.id}`))}
                      sx={{ cursor: 'pointer' }}
                    >
                      {item.name}
                    </Typography>
                    <Typography variant="caption" flexWrap={1} color="text.secondary">
                      {item.description}
                    </Typography>
                    <Stack direction="row" alignItems="center" useFlexGap spacing={1}>
                      <AlarmAddRounded fontSize="small" sx={{ color: item.color ? `${item.color}` : 'primary.main' }} />
                      <Typography variant="caption">{item?.max_items_limit} items limit </Typography>
                    </Stack>
                  </Stack>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(item.id)}
                    disableRipple
                    disableFocusRipple
                    disableTouchRipple
                  >
                    <DeleteRounded fontSize="small" sx={{ color: 'error.main' }} />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleEdit(item.id)}
                    disableRipple
                    disableFocusRipple
                    disableTouchRipple
                  >
                    <EditNoteRounded fontSize="small" sx={{ color: 'primary.main' }} />
                  </IconButton>
                </Stack>
              </CardContent>

              <CardActions sx={{ justifyContent: 'space-between' }}>
                {item.updated_at === null ? (
                  <Typography variant="caption" color="text.secondary">
                    Never updated
                  </Typography>
                ) : (
                  <Tooltip title={`Last updated around ${dayjs(item?.updated_at).fromNow()}`}>
                    <Typography variant="caption" color="text.secondary">
                      By {item.updator || 'anonymous'} {dayjs(item.updated_at).fromNow()}
                    </Typography>
                  </Tooltip>
                )}
                <Tooltip title={STATUS_OPTIONS.find((v) => v.label.toLowerCase() === item.status_name)?.display}>
                  <Stack direction="row" spacing="0.2rem" alignItems="center" alignSelf="flex-end">
                    <Typography variant="caption" alignSelf="flex-end">
                      Status:
                    </Typography>
                    {STATUS_OPTIONS.find((v) => v.label.toLowerCase() === item.status_name)?.icon}
                  </Stack>
                </Tooltip>
              </CardActions>
            </Card>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}
