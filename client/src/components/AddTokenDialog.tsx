import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Wand2 } from 'lucide-react'
import { toast } from '@/lib/toast'
import { createToken } from '@/api/tokens.api'
import { generateToken } from '@/lib/token-generator'
import { UI_TEXT } from '@/config/constants'

interface AddTokenDialogProps {
  onTokenAdded: () => void
}

export function AddTokenDialog({ onTokenAdded }: AddTokenDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    serviceName: '',
    token: '',
    expiryDate: ''
  })

  const handleGenerateToken = () => {
    if (!formData.serviceName) {
      toast.error(UI_TEXT.TOAST.ENTER_SERVICE_NAME)
      return
    }

    const generatedToken = generateToken(formData.serviceName)
    setFormData({ ...formData, token: generatedToken })
    toast.success(UI_TEXT.TOAST.TOKEN_GENERATED, {
      description: UI_TEXT.TOAST.TOKEN_GENERATED_DESC,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.serviceName || !formData.token || !formData.expiryDate) {
      toast.error(UI_TEXT.TOAST.ALL_FIELDS_REQUIRED)
      return
    }

    setLoading(true)

    try {
      await createToken({
        serviceName: formData.serviceName,
        token: formData.token,
        expiryDate: new Date(formData.expiryDate).toISOString(),
      })

      toast.success(UI_TEXT.TOAST.TOKEN_CREATED, {
        description: UI_TEXT.TOAST.TOKEN_CREATED_DESC(formData.serviceName),
      })

      // Reset form
      setFormData({
        serviceName: '',
        token: '',
        expiryDate: '',
      })

      // Close dialog
      setOpen(false)

      // Notify parent to refresh
      onTokenAdded()
    } catch (error) {
      toast.error(UI_TEXT.TOAST.FAILED_TO_CREATE, {
        description: error instanceof Error ? error.message : 'An unknown error occurred',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="h-4 w-4" />
          {UI_TEXT.APP.ADD_TOKEN}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] data-[state=open]:slide-in-from-bottom-4 data-[state=open]:slide-in-from-left-0 data-[state=closed]:slide-out-to-bottom-4 data-[state=closed]:slide-out-to-left-0">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{UI_TEXT.DIALOG.ADD_NEW_TOKEN}</DialogTitle>
            <DialogDescription>{UI_TEXT.DIALOG.ADD_TOKEN_DESCRIPTION}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="serviceName">{UI_TEXT.FORM.SERVICE_NAME_LABEL}</Label>
              <Input
                id="serviceName"
                placeholder={UI_TEXT.FORM.SERVICE_NAME_PLACEHOLDER}
                value={formData.serviceName}
                onChange={(e) => setFormData({ ...formData, serviceName: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="token">{UI_TEXT.FORM.ACCESS_TOKEN_LABEL}</Label>
              <div className="flex gap-2">
                <Input
                  id="token"
                  placeholder={UI_TEXT.FORM.ACCESS_TOKEN_PLACEHOLDER}
                  value={formData.token}
                  onChange={(e) => setFormData({ ...formData, token: e.target.value })}
                  required
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleGenerateToken}
                  title={UI_TEXT.FORM.AUTO_GENERATE_TOOLTIP}
                >
                  <Wand2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="expiryDate">{UI_TEXT.FORM.EXPIRY_DATE_LABEL}</Label>
              <Input
                id="expiryDate"
                type="date"
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              {UI_TEXT.FORM.CANCEL}
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? UI_TEXT.FORM.CREATING : UI_TEXT.FORM.CREATE_TOKEN}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
