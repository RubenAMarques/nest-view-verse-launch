
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/hooks/useAuth'
import { Building, Plus, Search, TrendingUp } from 'lucide-react'

export const Home = () => {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Hello Nest View 👋
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Smart property listing management for the modern real estate professional
        </p>
        {user && (
          <p className="text-sm text-muted-foreground">
            Welcome back, {user.email}!
          </p>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Listings
            </CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Properties currently listed
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Recent Views
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Views this week
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow md:col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Quick Actions
            </CardTitle>
            <Plus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Listing
            </Button>
            <Button variant="outline" className="w-full" size="sm">
              <Search className="h-4 w-4 mr-2" />
              Search Properties
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* PWA Installation Hint */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg">📱 Install Nest View</CardTitle>
          <CardDescription>
            Add Nest View to your home screen for quick access. Look for the install button in your browser!
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}
